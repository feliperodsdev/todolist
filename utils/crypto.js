const bcrypt = require('bcrypt')
const keyValue = parseInt(process.env.KEY_VALUE)

const hashPassword = (password) =>
{
    return bcrypt.hash(password, keyValue)
}

const comparePassword = async (password, passwordToCompare) =>
{
    // var passHash = await hashPassword(password)
    // console.log(passHash, ' ', passwordToCompare)
    // if(passHash === passwordToCompare) return true
    // else return false
    return await bcrypt.compare(password, passwordToCompare)
}

module.exports = 
{
    hashPassword, 
    comparePassword
}