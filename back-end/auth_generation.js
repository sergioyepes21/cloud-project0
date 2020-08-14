var jwt = require('jsonwebtoken')

module.exports.default = () => {
    const generateAuthToken = (data) => {
        const token = jwt.sign({ data }, 'shhhhh')
        return token
    }
    return {
        generateAuthToken
    }

}