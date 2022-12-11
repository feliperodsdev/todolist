const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')

const errorHandler = (err, req, res, next) =>
{
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
      }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('algo deu errado')
}

module.exports = errorHandler