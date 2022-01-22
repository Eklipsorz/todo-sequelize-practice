
const express = require('express')
const db = require('../../models')
const User = db.User


const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(() => res.redirect('/'))
})


router.get('/logout', (req, res) => {
  res.send('logout')
})

exports = module.exports = router