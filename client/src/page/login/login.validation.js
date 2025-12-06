import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("Informe o e-mail"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});
