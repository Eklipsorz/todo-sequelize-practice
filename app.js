const express = require('express')
const { create } = require('express-handlebars')


const port = 3000
const app = express()

const handlebars = create({
  extname: ".hbs",
  layoutsDir: process.cwd() + "/views/layouts",
  partialsDir: "views/partials",
  defaultLayout: "main"
})

app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

app.use(express.static('public'))



app.get('/', (req, res) => {
  console.log('hi')
})

app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})