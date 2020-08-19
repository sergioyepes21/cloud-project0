
import axios from 'axios';
import appsettings from '../data/appsettings.json';
import qs from 'qs';

export default (token = null) => {
    const createUser = (user) => {
        return axios({
            method: 'post',
            url: `${appsettings.backServiceUrl}/api/create-user`,
            headers: {},
            data: user
        })
    }
    const apiAuth = (username, password) => {
        return axios({
            method: 'post',
            url: `${appsettings.backServiceUrl}/api/api-auth`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'username': username,
                'password': password
            })
        })
    }
    const getEvents = () => {
        return axios({
            method: 'get',
            url: `${appsettings.backServiceUrl}/api/events`,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }
    const postEvent = (event) => {
        return axios({
            method: 'post',
            url: `${appsettings.backServiceUrl}/api/events`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: event
        })
    }
    const getEventbyId = (id) => {
        return axios({
            method: 'get',
            url: `${appsettings.backServiceUrl}/api/events/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }
    const putEvent = (id, event) => {
        return axios({
            method: 'put',
            url: `${appsettings.backServiceUrl}/api/events/${id}`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: event
        })
    }
    const deleteEvent = (id) => {
        return axios({
            method: 'delete',
            url: `${appsettings.backServiceUrl}/api/events/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }
    return {
        createUser,
        apiAuth,
        getEvents,
        getEventbyId,
        postEvent,
        putEvent,
        deleteEvent
    }
} 