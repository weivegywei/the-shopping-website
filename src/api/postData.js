const axios = require('axios');

export const postData = async (route, postBody) => {
    try {
        const data = await axios.post(route, postBody);
        return data;
    } catch(error) {
        console.log('catch within postdata')
        return {error: error.response.data};
    }

}