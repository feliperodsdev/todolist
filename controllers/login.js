const jwt = require('jsonwebtoken')
const {BadRequestError, ValidationError} = require('../errors/error-control')
const userModel = require('../models/user-model')
const {comparePassword} = require('../utils/crypto')
const login = async (req, res) =>
{
    var {username, password} = req.body
    if(!username || !password)
    {
        throw new BadRequestError("Username ou senha nao enviados")    
    }
    else  
    {
        var findUser = await userModel.find({user: username})
        if(findUser.length > 0)
        {
            var passwordIs = await comparePassword(password, findUser[0].password)
            if(passwordIs)
            {
                var token = jwt.sign({usernameId:username}, process.env.SECRET_KEY, {expiresIn: '10h'})
                res.status(200).json({msg:'success', token})
            }
            else 
            {
                throw new ValidationError("Password Invalid")
            }
        }
        else throw new ValidationError("User doesnt exists")
    }
}

module.exports = login