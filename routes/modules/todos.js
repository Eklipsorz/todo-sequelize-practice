
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo



// render create page 
router.get('/new', (req, res) => {
  res.render('new')
})





router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})


// update todo
// create todo

// delete todo

// router.delete('/:id', (req, res) => {

// })
exports = module.exports = router