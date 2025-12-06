import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Box, Typography, Paper } from "@mui/material";
import useCalendarService from "./calendar.service";
import AddEventModal from "../../modal/add.event.modal";
import EditEventModal from "../../modal/edit.event.modal";

export default function CalendarPage() {
  const {
    loadEvents,
    handleEventClick,
    isCreateModalOpen,
    handleOpenModal,
    handleCloseModal,
    isEditModalOpen,
    handleCloseEditModal,
    handleDelete,
    useCreateForm: { registerCreate, errorsCreate, onCreateSubmit },
    useEditForm: { registerEdit, errorsEdit, onEditSubmit, watchEdit },
  } = useCalendarService();

  const handleEvents = (fetchInfo, successCallback, failureCallback) => {
    loadEvents(fetchInfo.startStr, fetchInfo.endStr)
      .then((data) => {
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.nameActivity || 'Sem título',
          start: new Date(event.dateStart).setDate(new Date(event.dateStart).getDate() + 1),
          end: new Date(event.dateEnd).setDate(new Date(event.dateEnd).getDate() + 1),
          extendedProps: {
            description: event.description,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            status: event.status,
            usuarioId: event.usuarioId
          }
        }));
        // console.log({formattedEvents});
        successCallback(formattedEvents);
      })
      .catch(failureCallback);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ padding: 3, maxWidth: 900, margin: "0 auto", borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Meu Calendário
        </Typography>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={handleEvents}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "addEvent",
          }}
          customButtons={{
            addEvent: {
              text: "Adicionar Evento",
              click: handleOpenModal,
            },
          }}
          height="auto"
          locale={ptBrLocale}
        />
      </Paper>

      {isCreateModalOpen && (
        <AddEventModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onCreateSubmit={onCreateSubmit}
          registerCreate={registerCreate}
          errorsCreate={errorsCreate}
        />
      )}

      {isEditModalOpen && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          handleDelete={handleDelete}
          onEditSubmit={onEditSubmit}
          registerEdit={registerEdit}
          errorsEdit={errorsEdit}
          watchEdit={watchEdit}
        />
      )}
    </Box>
  );
}