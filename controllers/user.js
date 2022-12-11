const userModel = require('../models/user-model')
const {ValidationError, CustomAPIError} = require('../errors/error-control')
const {hashPassword} = require('../utils/crypto')

const createUser = async (req, res) => 
{
    var userToBeCreate = req.body
    userToBeCreate.password = await hashPassword(userToBeCreate.password)
    var docs = await userModel.find({user: userToBeCreate.user})
    if(docs.length == 0)
    {
        try 
        {
            var user = new userModel({...userToBeCreate})
            await user.save()
            res.status(200).json({msg: "success"})
        }
        catch(e)
        {
            for (var [key, value] of Object.entries(e.errors)) {
                throw new ValidationError(`${value.properties.path}: nao enviado`)  
            }
        }
    }
    else throw new CustomAPIError("user already exists")
}

const deleteUser = async (req, res) => 
{
    try
    {
        var userToBeDelete = req.user.usernameId
        await userModel.deleteOne({user: userToBeDelete})
        res.status(200).json({msg: "success"})
    }
    catch(e)
    {
        res.status(500).json({msg: "error delete user"})
    }
}

module.exports = 
{
    createUser, 
    deleteUser
}