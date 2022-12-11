require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.URL_DB

const connectDB = () => {
  return mongoose.connect(url)
}

module.exports = connectDB