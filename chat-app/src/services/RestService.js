import axios from 'axios';
import https from 'https'
import dotenv from 'dotenv';
dotenv.config();
const REACT_APP_URL = process.env.REACT_APP_URL

export { axios };

export const get = (url) => {
    return request({ url })
}
export const post = (url, data) => {
    return request({ method: 'post', url, data })
}
export const put = (url, data) => {
    return request({ method: 'put', url, data })
}
export const remove = (url) => {
    return request({ method: 'delete', url })
}

export const request = ({ url, method = 'get', ...params }) => {
    if (url.charAt(0) !== '/') {
        url = '/' + url
    }

    return axios({
        ...params,
        method,
        url: REACT_APP_URL + url,
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false, // (NOTE: this will disable client verification)
        })
    })
}