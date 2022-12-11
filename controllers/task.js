const taskModel = require('../models/task-model')
const {ValidationError, CustomAPIError} = require('../errors/error-control')
const moment = require('moment')
const getTasksByUser = async (req, res) =>
{
    try
    {
        var owner_user = req.user.usernameId
        let docs =  await taskModel.find({owner_user: owner_user}).lean()
        const taskList = docs.map(({ doat, ...doc }) => ({ ...doc, doat: moment(doat).format('YYYY-MM-DD') }));
        res.status(200).json(taskList)
    } catch(e)
    {
        for (var [key, value] of Object.entries(e.errors)) {
            throw new ValidationError(`${value.properties.path}: nao enviado`)  
        }
    }
}

const createTask = async  (req, res) => 
{
    var owner_user = req.user.usernameId
    var taskToBeCreate = req.body
    try 
    {
        var task = new taskModel({owner_user:owner_user, ...taskToBeCreate})
        await task.save()
        res.status(200).json({msg: "success", _id: task._id.toString()})
    }
    catch(e)
    {
        for (var [key, value] of Object.entries(e.errors)) {
            throw new ValidationError(`${value.properties.path}: nao enviado`)  
        }
    }
}

const deleteTask = async (req, res) => 
{
    var owner_user = req.user.usernameId
    var taskToBeDeleted = req.params
    console.log(taskToBeDeleted)
    var task = await taskModel.find({_id: taskToBeDeleted._id, owner_user:owner_user})
    if(task.length > 0)
    {
        try
        {
            await taskModel.deleteOne({_id: taskToBeDeleted._id})
            res.status(200).json({msg:"success"})
        }
        catch(e)
        {
            res.status(400).json({msg: "failed"})
        }
    }
    else 
    {
        throw new ValidationError("Task doesnt exist")
    }
}

const doneTodo = async (req, res) =>
{
    var {_id} = req.body
    var owner_user = req.user.usernameId
    try
    {
        var task = await taskModel.find({_id: _id, owner_user:owner_user}) 
        console.log(owner_user, _id)
        if(task.length == 1)
        {
            if(task[0].done)
            {
                await taskModel.updateOne({_id:_id}, 
                {
                    done: false 
                })
            }
            else 
            {
                await taskModel.updateOne({_id:_id}, 
                {
                    done: true
                })
            }
            res.status(200).json({msg: "updated"})
        }
        else 
        {
            throw new CustomAPIError('task doesnt exist')
        }
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports = {
    getTasksByUser,
    createTask, 
    deleteTask, 
    doneTodo
}