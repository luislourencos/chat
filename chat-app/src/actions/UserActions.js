import { authenticate } from '../services/UserService';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const REACT_APP_SECRET = process.env.REACT_APP_SECRET
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_ISAUTH = "USER_ISAUTH";


export const userLogin = (email, password) => async (dispatch) => {
    const token = await authenticate(email, password)
    localStorage.setItem('token', token)

    var decoded = jwt.verify(token, REACT_APP_SECRET);

    if (decoded) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    dispatch({ type: USER_LOGIN, payload: decoded });
}

export const userIsAuth = () => (dispatch) => {
    const token = localStorage.getItem('token')
    let decoded;
    if (token) {
        decoded = jwt.verify(token, REACT_APP_SECRET);
        if (decoded) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    } else {
        decoded = ''
    }
    dispatch({ type: USER_ISAUTH, payload: { user: decoded, isAuth: decoded ? true : false } });
}

export const userLogout = () => (dispatch) => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = ''
    dispatch({ type: USER_LOGOUT });
}

