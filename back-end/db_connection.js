const { Client } = require('pg')
const appsettings = require('./data/appsettings.json')

module.exports.default = () => {
    const createClientConn = () => {
        console.log('Va a crear conn')
        const client = new Client(appsettings)
        client.connect()
        return client
    }
    const endClientConn = (client) => {
        if (client)
            client.end()
    }
    const buildEventValues = (event) => {
        event = event ? event : {}
        const name = event.name ? event.name : ''
        const place = event.place ? event.place : ''
        const address = event.address ? event.address : ''
        const start_date = event.start_date ? event.start_date : new Date()
        const end_date = event.end_date ? event.end_date : new Date()
        const is_virtual = event.is_virtual != null && event.is_virtual != undefined ? event.is_virtual : false
        const user_id = event.user_id ? event.user_id : null
        const values = [name, place, address, start_date, end_date, is_virtual, user_id]
        return values
    }
    return {
        getEvents: async () => {
            const client = createClientConn()
            const result = await client.query('SELECT * FROM events').catch(e => console.error(e))
            endClientConn(client)
            return result ? result.rows : []
        },
        postEvents: async (event) => {
            const client = createClientConn()
            const query = 'INSERT INTO events(name, place, address, start_date, end_date, is_virtual, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
            const values = buildEventValues(event)
            const result = await client.query(query, values).catch(e => console.error(e))
            endClientConn(client)
            return result ? result.rows : []
        },
        getEventById: async (id) => {
            const client = createClientConn()
            const result = await client.query('SELECT * FROM events WHERE id = ' + id).catch(e => console.error(e))
            endClientConn(client)
            return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
        },
        putEvents: async (id, event) => {
            const client = createClientConn()
            const query = 'UPDATE events SET name = $1, place = $2, address = $3, start_date = $4, end_date = $5, is_virtual = $6, user_id = $7 WHERE id = $8'
            let values = buildEventValues(event)
            values.push(id)
            const result = await client.query(query, values).catch(e => console.error(e))
            endClientConn(client)
            return result ? result.rows : []
        },
        deleteEvent: async (id) => {
            const client = createClientConn()
            const result = await client.query('DELETE FROM events WHERE id = ' + id).catch(e => console.error(e))
            endClientConn(client)
            return result
        }
    }
}