const homeRoutes = require('./modules/home')
const todoRoutes = require('./modules/todos')
const usersRoutes = require('./modules/users')

const express = require('express')
const router = express.Router()


router.use('/todos', todoRoutes)
router.use('/users', usersRoutes)
router.use('/', homeRoutes)


exports = module.exports = router