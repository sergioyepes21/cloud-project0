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
        const event_initial_date = transformDate(event.event_initial_date)
        const event_final_date = transformDate(event.event_final_date)
        const event_type = event.event_type ? event.event_type : ''
        const username_owner = event.username_owner ? event.username_owner : null
        const values = { event_name, event_place, event_address, event_initial_date, event_final_date, event_type, username_owner }
        return values
    }
    const transformDate = (date) => {
        date = date ? new Date(date) : new Date()
        return date.toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '')
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
                const values = buildEventValues(event)
                const usernameOwnerCheck = values.username_owner ? true : false
                const query = `INSERT INTO events(event_name, event_place, event_address, event_initial_date, event_final_date, event_type ${usernameOwnerCheck ? ', username_owner' : ''}) VALUES
                 ('${values.event_name}', '${values.event_place}', '${values.event_address}', '${values.event_initial_date}', '${values.event_final_date}', '${values.event_type}' ${usernameOwnerCheck ? `, '${values.username_owner}'` : ''}) RETURNING *`

                result = await client.query(query).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
        },
        getEventById: async (id) => {
            let result = null
            try {
                const client = createClientConn()
                result = await client.query(`SELECT * FROM events WHERE id = '${id}'`).catch(e => console.error(e))
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
                let values = buildEventValues(event)
                const usernameOwnerCheck = values.username_owner ? true : false
                const query = `UPDATE events event_name='${values.event_name}', event_place='${values.event_place}', event_address='${values.event_address}', event_initial_date='${values.event_initial_date}',
                 event_final_date='${values.event_final_date}',event_type='${values.event_type}' ${usernameOwnerCheck ? `, username_owner='${values.username_owner}'` : ''}) WHERE id = ${id}`
                console.log('-----> query', query)

                result = await client.query(query).catch(e => console.error(e))
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
                result = await client.query(`DELETE FROM events WHERE id = '${id}'`).catch(e => console.error(e))
                endClientConn(client)
            } catch (e) {
                console.error(e)
            }
            return result
        }
    }
}