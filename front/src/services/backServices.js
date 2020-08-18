
import axios from 'axios';
import appsettings from '../data/appsettings.json';

export default () => {
    const createUser = (user) => {
        return axios.post(`${appsettings.backServiceUrl}/api/create-user`,{
            user
        })
    }
    return {
        createUser
    }
} 