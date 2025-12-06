const db = require('../db/models');
const bcrypt = require('bcrypt')
const { userScherma } = require('../validations/userValidation')
const { z } = require('zod')

exports.createUser = async (req, res) => {
    try {
        const validatedData = userScherma.parse(req.body);
        const password = validatedData.password;
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds)
        const response = await db.Users.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashPass
        });
        return res.status(200).json({ message: "Usuario cadastrado com sucesso!", user: response });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Email já está cadastrado." });
        }
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        }
        return res.status(400).json({ error: 'Erro ao cadastrar usuário.', message: error.message });
    }

}

exports.listUsers = async (req, res) => {

    const users = await db.Users.findAll({
        // caso eu queira filtrar apenas alguns parametros especificos
        // attributes: [['id', 'name', 'email', 'password']] 
    })

    if (users) {
        return res.status(200).json({
            users
        })
    } else {
        return res.status(400).json({
            message: "Error ao listar dados do usuario."
        })
    }

}

exports.getUser = async (req, res) => {

    const id = req.params.id;
    // console.log(id)
    const user = await db.Users.findOne({ where: { id: id } })

    if (user) {
        return res.status(200).json({
            user
        })
    } else {
        return res.status(400).json({
            message: "Erro ao lista usuario"
        })
    }
}

exports.acessUser = async (req, res) => {

    try {
        var dados = req.body;
        // console.log(dados)
        const password = dados.password

        const user = await db.Users.findOne({
            where: {
                email: dados.email,
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "Usuario não cadastrado!"
            })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (comparePass === false) {
            return res.status(400).json({
                message: "Senha incorreta!"
            })
        }

        return res.status(200).json({
            user,
            message: "Acesso Efetuado!"
        })

    } catch (error) {
        return res.status(400).json({
            message: "Acesso Negado!"
        })
    }

}