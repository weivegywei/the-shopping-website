const axios = require('axios');

export const postData = async (route, postBody) => {
    try {
        const data = await axios.post('https://my-wei-shopping-website-server.herokuapp.com' + route, postBody);
        return data;
    } catch(error) {
        console.log('catch within postdata')
        return {error: error.response.data};
    }

}
