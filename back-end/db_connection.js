const { Client } = require('pg')
const appsettings = require('./data/appsettings.json')

module.exports.default = () => {
    const createClientConn = () => {
        console.log('Va a crear conn')
        
        return new Client(appsettings)
    }
    const endClientConn = (client) => {
        if (client)
            client.end()
    }
    return {
        getUsers: async () => {
            const client = createClientConn()
            client.connect()
            console.log('Va a hacer query')
            const result = await client.query('SELECT * FROM user_cloud').catch(e => console.error(e))
            console.log('result',result);
            
            endClientConn(client)
            return result
        }
    }
}