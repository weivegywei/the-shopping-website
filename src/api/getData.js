const axios = require('axios');

export const getData = (route) => {
    return axios.get(process.env.REACT_APP_SERVER_ENDPOINT + route)
}
