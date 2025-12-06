import * as z from "zod";

export const calendar = z.object({
  nameActivity: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  dateStart: z.string().min(1, "A data de início é obrigatória"),
  dateEnd: z.string().optional(),
  status: z.enum(["pendente", "concluido", "cancelado"], "O status é obrigatório e deve ser 'Pendente', 'Concluido' ou 'Cancelado'"),
});