const router = require('express').Router()
const {TodoController} = require('./controllers/')
const authMiddleware = require("./middlewares/auth.middleware")


router.post('/create', authMiddleware, TodoController.create_todo);
router.get('/', authMiddleware, TodoController.find_todos);
router.get('/:id', authMiddleware, TodoController.find_todo_by_id)
router.put('/:id', authMiddleware, TodoController.update_todo)
router.delete('/:id', authMiddleware, TodoController.delete_todo)

module.exports = router

