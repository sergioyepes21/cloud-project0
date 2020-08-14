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
    const buildUserValues = (user) => {
        user = user ? user : {}
        const username = user.username ? user.username : ''
        const first_name = user.first_name ? user.first_name : ''
        const last_name = user.last_name ? user.last_name : ''
        const email = user.email ? user.email : ''
        const password = user.password ? user.password : ''
        return { username, first_name, last_name, email, password }
    }
    const transformDate = (date) => {
        date = date ? new Date(date) : new Date()
        return date.toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '')
    }
    const getUserByUsernameOrEmail = async (username, email) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            result = await client.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`).catch(e => console.error(e))
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
    }
    const postUser = async (user) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            const userValues = buildUserValues(user)
            const userQuery = await getUserByUsernameOrEmail(userValues.username, userValues.email).catch(e => console.error(e))
            console.log('----> user', userQuery);
            if (userQuery)
                throw new Error('Username or email already exists')
            const query = `INSERT INTO users (username, first_name, last_name, email, password) VALUES (
                    '${userValues.username}','${userValues.first_name}','${userValues.last_name}','${userValues.email}','${userValues.password}'
                ) RETURNING *`
            console.log('------> query', query)
            result = await client.query(query).catch(e => console.error(e))
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        if (result && result.rows && result.rows.length > 0) {
            result = result.rows[0]
            delete result.password
        } else {
            result = null
        }
        return result
    }
    const getEvents = async () => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            result = await client.query('SELECT * FROM events').catch(e => console.error(e))
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return result ? result.rows : []
    }
    const postEvents = async (event) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            const values = buildEventValues(event)
            const usernameOwnerCheck = values.username_owner ? true : false
            const query = `INSERT INTO events(event_name, event_place, event_address, event_initial_date, event_final_date, event_type ${usernameOwnerCheck ? ', username_owner' : ''}) VALUES
             ('${values.event_name}', '${values.event_place}', '${values.event_address}', '${values.event_initial_date}', '${values.event_final_date}', '${values.event_type}' ${usernameOwnerCheck ? `, '${values.username_owner}'` : ''}) RETURNING *`

            result = await client.query(query).catch(e => console.error(e))
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
    }
    const getEventById = async (id) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            result = await client.query(`SELECT * FROM events WHERE id = '${id}'`).catch(e => console.error(e))
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return result && result.rows && result.rows.length > 0 ? result.rows[0] : null
    }
    const putEvents = async (id, event) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            let values = buildEventValues(event)
            const usernameOwnerCheck = values.username_owner ? true : false
            const query = `UPDATE events SET event_name='${values.event_name}', event_place='${values.event_place}', event_address='${values.event_address}', event_initial_date='${values.event_initial_date}',
             event_final_date='${values.event_final_date}',event_type='${values.event_type}' ${usernameOwnerCheck ? `, username_owner='${values.username_owner}'` : ''} WHERE id = ${id}`

            result = await client.query(query).catch(e => console.error(e))
            endClientConn(client)
            if (result && result.rowCount > 0) {
                result = await getEventById(id)
            }
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return result
    }
    const deleteEvent = async (id) => {
        let result = null
        let client = null
        try {
            client = createClientConn()
            const row = await getEventById(id)
            if (row) {
                result = await client.query(`DELETE FROM events WHERE id = '${id}'`).catch(e => console.error(e))
            } else {
                throw new Error('Event does not exists')
            }
            endClientConn(client)
        } catch (e) {
            console.error(e)
            if (client)
                endClientConn(client)
            return Promise.reject(e)
        }
        return row
    }
    return {
        postUser,
        getEvents,
        postEvents,
        getEventById,
        putEvents,
        deleteEvent
    }
}