const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user: {
            type: String, 
            required: true
        }, 
        name: {
            type: String, 
            required: true
        }, 
        password: {
            type: String, 
            required: true
        }
    }
)

module.exports = userSchema