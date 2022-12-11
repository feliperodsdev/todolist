const mongoose = require('mongoose')
const {userSchema} = require('../schemas/schemas-index')
const user = mongoose.model('User', userSchema)

module.exports = user