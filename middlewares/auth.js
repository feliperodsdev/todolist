const jwt = require('jsonwebtoken')
const {CustomAPIError} = require('../errors/error-control')

const AuthMiddleware = async (req, res, next) => 
{
    const authToken = req.headers.authorization 
    if(!authToken || !authToken.startsWith('Bearer ')) throw CustomAPIError('Token nao enviado', 401)
    try
    {
        var token = authToken.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user = user
        if(req.url == '/validation') res.status(200).json({msg: 'valid'})
        else next()
    }
    catch(e)
    {
        throw CustomAPIError('Token invalido', 401)
    }

}

module.exports = AuthMiddleware