const axios = require('axios');

export const postData = async (route, postBody) => {
    try {
        const data = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + route, postBody);
        return data;
    } catch(error) {
        if (error && error.response) {
            console.log('catch error within postdata')
            return {error: error.response.data};
        }
    }
}
