const axios = require('axios');

const apiUrl = process.env.URL_API_BACKEND_EXTERNAL;

const requestGetApi = async(urlValue, tokenValue, headerValue) => {
    try {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': tokenValue,
            ...headerValue
        }
        const response = await axios.post(apiUrl + urlValue, {headers: header})
        if (response) {
            return {'status': 200, 'message':'successful!!!', 'data': response.data};
        } else {
            return {'status': 200, 'message':'no hay datos', 'data':{}}
        }
    } catch (error) {
        console.log(error);
    }
};
const requestPostApi = async(urlValue, bodyValue, tokenValue) => {
    try {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': tokenValue
        }
        const response = await axios.post(apiUrl + urlValue, {body: bodyValue}, {headers: header})
        if (response) {
            return {'status': 200, 'message':'successful!!!', 'data': response.data};
        } else {
            return {'status': 200, 'message':'no hay datos', 'data':{}}
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    requestGetApi,
    requestPostApi
};