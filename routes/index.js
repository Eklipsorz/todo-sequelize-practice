const homeRoutes = require('./modules/home')
const todoRoutes = require('./modules/todos')
const usersRoutes = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const express = require('express')
const router = express.Router()



router.use('/todos', authenticator, todoRoutes)
router.use('/users', usersRoutes)
router.use('/', authenticator, homeRoutes)


exports = module.exports = router