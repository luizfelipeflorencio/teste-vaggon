const { Router } = require('express')
const routes = Router()
const userRouters = require('./usersRouter')
const activityRouters = require('./activityRouter')

routes.use(userRouters)
routes.use(activityRouters)

module.exports = routes
