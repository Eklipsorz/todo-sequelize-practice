
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo



// render create page 
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id

  Todo.create({
    UserId,
    name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
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
router.put('/:id', async (req, res) => {
  const { name, isDone } = req.body
  const id = req.params.id


  const targetTodo = await Todo.findByPk(id)
  targetTodo.name = name
  targetTodo.isDone = isDone === 'on'

  await targetTodo.save()
  res.redirect('/')
})

// delete todo
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const targetTodo = await Todo.findByPk(id)
  await targetTodo.destroy()
  res.redirect('/')
})

exports = module.exports = router