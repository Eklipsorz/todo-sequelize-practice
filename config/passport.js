const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User


function usePassport(app) {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }

        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (!isMatched) {
              return done(null, false, { message: 'Email or Password incorrect.' })
            }
            return done(null, user)
          })


      })
      .catch(error => done(error, false))

  }))


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        user = user.toJSON()
        done(null, user)
      })
      .catch(error => done(error, false))
  })
}


exports = module.exports = usePassport