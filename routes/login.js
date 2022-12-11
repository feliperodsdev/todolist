const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controllers/login')

loginRouter.route("/").post(loginController)

module.exports = loginRouter