const express = require('express')
const methodOverride = require('method-override')
const { create } = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')



const port = 3500
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
  secret: 'TheGoodCat',
  resave: false,
  saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

usePassport(app)


app.use('/', routes)

app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})