const axios = require('axios');

export const postData = async (route, postBody) => {
    try {
        //console.log(process.env.REACT_APP_SERVER_ENDPOINT + route, 'route', postBody, 'postBody')
        const data = await axios.post(process.env.REACT_APP_SERVER_ENDPOINT + route, postBody);
        //console.log(data, 'data')
        return data;
    } catch(error) {
        if (error && error.response) {
            console.log('catch error within postdata')
            return {error: error.response.data};
        }
    }
}
