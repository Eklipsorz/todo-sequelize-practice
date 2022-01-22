const homeRoutes = require('./modules/home')
const todoRoutes = require('./modules/todo')
const usersRoutes = require('./modules/user')
const authRoutes = require('./modules/auth')

const { authenticator } = require('../middleware/auth')
const express = require('express')
const router = express.Router()



router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/todos', authenticator, todoRoutes)
router.use('/', authenticator, homeRoutes)


exports = module.exports = router