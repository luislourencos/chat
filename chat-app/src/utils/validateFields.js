import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const REACT_APP_SECRET = process.env.REACT_APP_SECRET

export const validateEmpty = (value) => {
    return value.trim().length ? '' : 'error.empty'
}

export const validateWordLength = (value) => {
    return (value.trim().length >= 3 && value.trim().length <= 15) ? '' : 'error.minLength'
}

export const validatePassword = (value) => {
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
    return PASSWORD_REGEX.test(value) ? '' : 'error.password'
}
export const validateEmail = (value) => {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(value) ? '' : 'error.email'
}
export const validateToken = () => {
    const token = localStorage.getItem('token')

    if (token) {
        try {
            var decoded = jwt.verify(token, REACT_APP_SECRET);
            if (decoded) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                return true
            }
        } catch (error) {
            return false
        }
    }
    return false

}