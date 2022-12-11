const express = require('express')
const taskRouter = express.Router()
const {getTasksByUser, createTask, deleteTask, doneTodo} = require('../controllers/task')
const AuthMiddleware = require('../middlewares/auth')


taskRouter.route("/operations").get(AuthMiddleware, getTasksByUser)
.post(AuthMiddleware, createTask)
.put(AuthMiddleware, doneTodo)
taskRouter.route("/operations/:_id").delete(AuthMiddleware, deleteTask)
module.exports = taskRouter