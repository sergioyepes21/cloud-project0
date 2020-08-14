var jwt = require('jsonwebtoken')

module.exports.default = () => {
    const generateAuthToken = (data) => {
        const token = jwt.sign({ data }, 'shhhhh')
        return token
    }
    const isValidToken = (token) => {
        console.log('token', token)
        if(!token){
            return false
        }
        try {            
            const decoded = jwt.verify(token, 'shhhhh')
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }
    return {
        generateAuthToken,
        isValidToken
    }

}