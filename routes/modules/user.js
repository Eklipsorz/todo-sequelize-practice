
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User


const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const registerWarningMessages = []

  if (!name || !email || !password || !confirmPassword) {
    registerWarningMessages.push('Please input all fields')
  }

  if (password !== confirmPassword) {
    registerWarningMessages.push('The passwords are not same!!')
  }

  if (registerWarningMessages.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      registerWarningMessages
    })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      registerWarningMessages.push('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        registerWarningMessages
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })

})


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

exports = module.exports = router