const axios = require('axios');

export const postData = async (route, postBody) => {
    try {
        const data = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + route, postBody);
        return data;
    } catch(error) {
        console.log('catch within postdata')
        return {error: error.response.data};
    }

}
