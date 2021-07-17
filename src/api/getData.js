const axios = require('axios');

export const getData = (route) => {
    return axios.get('https://my-wei-shopping-website-server.herokuapp.com' + route)
}

