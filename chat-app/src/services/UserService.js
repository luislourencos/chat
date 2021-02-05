import { get, post, axios } from './RestService';

export const register = (name, email, password) => {
    return post('user/register', { name, email, password })
}
export const authenticate = async (email, password) => {
    const { data: { token } } = await post('user/authenticate', { email, password })
    console.log(token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token
}

export const getUser = (userId = '') => {
    return get(`user/get/${userId}`)
}