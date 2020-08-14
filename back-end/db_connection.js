const { Client } = require('pg')
const appsettings = require('./data/appsettings.json')

module.exports.default = () => {
    const createClientConn = () => {
        const client = new Client(appsettings)
        client.connect()
        return client
    }
    const endClientConn = (client) => {
        try {
            client.end()
        } catch (e) {
            console.error(e)
        }
    }
    const buildEventValues = (event) => {
        event = event ? event : {}
        const event_name = event.event_name ? event.event_name : ''
        const event_place = event.event_place ? event.event_place : ''
        const event_address = event.event_address ? event.event_address : ''
        const event_initial_date = event.event_initial_date ? event.event_initial_date : new Date()
        const event_final_date = event.event_final_date ? event.event_final_date : new Date()
        const event_type = event.event_type ? event.event_type : ''
        const username_owner = event.username_owner ? event.username_owner : null
        const values = [event_name, event_place, event_address, event_initial_date, event_final_date, event_type, username_owner]
        return values
    }
    return {
        getEvents: async () => {
            let result = null
            try {
                const client = createClientConn()
                result = await client.query('SELECT * FROM events').catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result ? result.rows : []
        },
        postEvents: async (event) => {
            let result = null
            try {
                const client = createClientConn()
                const query = 'INSERT INTO events(event_name, event_place, event_address, event_initial_date, event_final_date, event_type, username_owner) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
                const values = buildEventValues(event)
                result = await client.query(query, values).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result
        },
        getEventById: async (id) => {
            let result = null
            try {
                const client = createClientConn()
                result = await client.query('SELECT * FROM events WHERE id = ' + id).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
        },
        putEvents: async (id, event) => {
            let result = null
            try {
                const client = createClientConn()
                const query = 'UPDATE events SET event_name = $1, event_place = $2, event_address = $3, event_initial_date = $4, event_final_date = $5, event_type = $6, username_owner = $7 WHERE id = $8'
                let values = buildEventValues(event)
                values.push(id)
                result = await client.query(query, values).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result
        },
        deleteEvent: async (id) => {
            let result = null
            try {
                const client = createClientConn()
                result = await client.query('DELETE FROM events WHERE id = ' + id).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result
        }
    }
}