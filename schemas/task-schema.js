const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        owner_user: {
            type: String, 
            required: true
        },
        
        title: {
            type: String, 
            required: true
        }, 
        content: 
        {
            type: String, 
            required: true
        }, 
        done: 
        {
            type: Boolean, 
            required: true
        }, 
        doat: {
            type: Date, 
            required: false
        }
    }
)

module.exports = taskSchema