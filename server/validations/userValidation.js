const { z } = require('zod')

const userScherma = z.object({
    name: z.string().min(1, "Nome é obrigatorio"),
    email: z.string().email("E-mail inválido").min(1, "Informe o e-mail"),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
})

module.exports = {
    userScherma
}