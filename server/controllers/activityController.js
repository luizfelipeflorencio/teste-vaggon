const db = require('../db/models')
const { Op } = require('sequelize');
const { activitiesScherma } = require('../validations/activitiesValidation')
const { z } = require('zod')

exports.createActivities = async (req, res) => {
    try {
        const validatedData = activitiesScherma.parse(req.body);
        const userId = req.params.userId
        const user = await db.Users.findOne({ where: { id: userId } })

        if (!user) {
            return res.status(400).json({ message: 'Usuario não é cadastrado!' })
        }
        // console.log(user.id)
        const response = await db.Activities.create({
            nameActivity: validatedData.nameActivity,
            description: validatedData.description,
            dateStart: validatedData.dateStart,
            dateEnd: validatedData.dateEnd,
            status: validatedData.status,
            usuarioId: user.id
        })
        return res.status(200).json({ message: 'Atividade criada!', response })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        }
        return res.status(400).json({ message: 'Atividade Não Criada!', error })

    }
}

exports.getActivites = async (req, res) => {
    try {
        const now = new Date();
        const dateStart = req.query?.dateStart ?? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15);
        const dateEnd = req.query?.dateEnd ?? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15);
        const userId = req.params.userId
        const user = await db.Users.findOne({ where: { id: userId } })

        if (!user) {
            return res.status(400).json({ message: 'Usuario não é cadastrado!' })
        }

        const response = await db.Activities.findAll({
            where: {
                usuarioId: user.id,

                dateStart: {
                    [Op.gt]: dateStart
                },
                dateEnd: {
                    [Op.lt]: dateEnd
                }
            },

        })

        return res.status(200).json({ message: 'Lista de Atividades!', response })

    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: 'Não foi possivel listar as Atividades', error })
    }
}

exports.updateActivities = async (req, res) => {
    try {
        const validatedData = activitiesScherma.parse(req.body);
        const id = req.params.id;
        const response = await db.Activities.update(validatedData, { where: { id: id } })
        return res.status(200).json({ message: 'Atividade atualizada com sucesso', response })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        }
        return res.status(400).json({ message: "Erro ao atualizar atividade", error })
    }
}

exports.deleteActivities = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id)
        const response = await db.Activities.destroy({ where: { id: id } })
        return res.status(200).json({ message: 'Atividade deletada com sucesso', response })
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao deletar atividade', error })
    }
}