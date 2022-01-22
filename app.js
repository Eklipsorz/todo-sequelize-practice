const express = require('express')
const methodOverride = require('method-override')
const { create } = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')


const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const port = process.env.PORT || 3000
const app = express()

const handlebars = create({
  extname: ".hbs",
  layoutsDir: process.cwd() + "/views/layouts",
  partialsDir: "views/partials",
  defaultLayout: "main"
})

app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))
usePassport(app)
app.use(flash())
app.use('/', (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.loginFailureMessage = req.flash('error')
  res.locals.loginFirstWarningMessage = req.flash('loginfirst-warning-message')
  res.locals.logoutSuccessMessage = req.flash('logout-success-message')
  next()
})


app.use('/', routes)

app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})