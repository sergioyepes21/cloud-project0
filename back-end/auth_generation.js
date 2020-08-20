var jwt = require('jsonwebtoken')

module.exports.default = () => {
    const generateAuthToken = (data) => {
        const token = jwt.sign({ data }, 'shhhhh')
        return token
    }
    const isValidToken = (token) => {
        if (!token) {
            return [false, null]
        }
        try {
            const decoded = jwt.verify(token, 'shhhhh')
            return [true, decoded]
        } catch (e) {
            console.error(e)
            return [false, null]
        }
    }
    return {
        generateAuthToken,
        isValidToken
    }

}