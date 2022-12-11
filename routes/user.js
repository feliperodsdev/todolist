const express = require('express')
const userRoute = express.Router()
const {createUser, deleteUser} = require('../controllers/user')
const AuthMiddleware = require('../middlewares/auth')

userRoute.route('/validation').get(AuthMiddleware)
userRoute.route('/create').post(createUser)
userRoute.route('/delete').delete(AuthMiddleware, deleteUser)

module.exports = userRoute