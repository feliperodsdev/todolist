const mongoose = require('mongoose')
const {taskSchema} = require('../schemas/schemas-index')
const task = mongoose.model('Tasks', taskSchema)

module.exports = task