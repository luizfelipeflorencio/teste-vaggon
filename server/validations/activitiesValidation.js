const { z } = require('zod')

const activitiesScherma = z.object({
    nameActivity: z.string().min(1, "Nome da atividade é obrigatorio"),
    description: z.string().min(1, "Descrição da atividade é obrigatorio"),
    dateStart: z.string("Data Inicial da atividade é obrigatoria."),
    dateEnd: z.string("Data Final da atividade é obrigatoria."),
    status: z.string("Status da atividade é obrigatorio."),
})

module.exports = {
    activitiesScherma
}