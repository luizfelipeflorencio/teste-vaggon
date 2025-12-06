import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { calendar } from "./calendar.validation";
import { get, post, put, del } from "../../utils/api"; // Importar as funções do api.js

export default function useCalendarService() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    formState: { errors: errorsCreate },
  } = useForm({
    resolver: zodResolver(calendar),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
    watch: watchEdit,
  } = useForm({
    resolver: zodResolver(calendar),
  });

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    // console.log({ teste: arg.event })
    resetEdit({
      nameActivity: arg.event.title,
      description: arg.event.extendedProps?.description || "",
      dateStart: arg.event.extendedProps?.dateStart ? 
        new Date(arg.event.extendedProps.dateStart).toISOString().split('T')[0] : "",
      dateEnd: arg.event.extendedProps?.dateEnd ? 
        new Date(arg.event.extendedProps.dateEnd).toISOString().split('T')[0] : "",
      status: arg.event.extendedProps?.status || "",
    });
    console.log(status)
    setIsEditModalOpen(true);
  };

  const handleOpenModal = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    resetEdit();
  };

  const handleDelete = async () => {
    const result = await del(`/activity/${selectedEvent.id}`);
    if (result.success) {
      handleCloseEditModal();
    }
  };

  const loadEvents = async (start, end) => {
    console.log("Carregando eventos de", start, "até", end);
    const userId = localStorage.getItem('userId')
    const result = await get(`/activity/${userId}?dateStart=${start}&dateEnd=${end}`); // Usar a função get do api.js com query params
    if (result.success) {
      console.log(result.data.response)
      return result.data.response;
    } else {
      console.error(result.error);
      return [];
    }
  };

  const createEvent = async ({ nameActivity, description, dateStart, dateEnd, status }) => {
    const userId = localStorage.getItem('userId')
    const result = await post(`/activity/${userId}`, { nameActivity, description, dateStart, dateEnd, status });
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      return null; // Ou lançar erro, dependendo da lógica
    }
  };

  const updateEvent = async ({ nameActivity, description, dateStart, dateEnd, status }, eventId) => {
    const result = await put(`/activity/${eventId}`, { nameActivity, description, dateStart, dateEnd, status });
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      return null;
    }
  };

  const onCreateSubmit = handleCreateSubmit(async (data) => {
    const result = await createEvent(data);
    if (result) {
      // TODO: Recarregar eventos após criação (usar refetchEvents do FullCalendar)
      handleCloseModal();
    }
  });

  const onEditSubmit = handleSubmitEdit(async (data) => {
    const result = await updateEvent(data, selectedEvent.id);
    if (result) {
      // TODO: Recarregar eventos após edição (usar refetchEvents do FullCalendar)
      handleCloseEditModal();
    }
  });

  return {
    handleEventClick,
    loadEvents,
    handleDelete,

    //ESTADOS DE MODAIS ABERDOS
    isCreateModalOpen,
    isEditModalOpen,
    // ARBRIR E FECHAR MODAIS
    handleOpenModal,
    handleCloseModal,
    handleCloseEditModal,

    useCreateForm: {
      onCreateSubmit,
      registerCreate,
      errorsCreate,
    },
    useEditForm: {
      onEditSubmit,
      registerEdit,
      errorsEdit,
      watchEdit,
    },
  };
}
