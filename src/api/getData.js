const axios = require('axios');

export const getData = (route) => axios.get(route)