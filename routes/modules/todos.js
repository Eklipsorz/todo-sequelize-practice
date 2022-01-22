
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo


router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})
exports = module.exports = router