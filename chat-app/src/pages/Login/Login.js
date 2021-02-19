import React, { useState, useRef } from 'react';
import './styles.sass'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { createAlert } from '../../actions/AlertActions'
import { userLogin } from '../../actions/UserActions'
import { connect } from 'react-redux';
import { validateEmail, validatePassword, getErrorMessage } from '../../utils'

export const LoginBase = ({ createAlert, userLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation();
    const history = useHistory()

    const passwordRef = useRef(null)

    const handlerSubmit = async () => {
        //validateFiels
        setLoading(true)
        setErrorEmail(validateEmail(email));
        setErrorPassword(validatePassword(password));

        if (validateEmail(email) || validatePassword(password)) {
            return setLoading(false)
        } else {
            try {
                await userLogin(email.toLowerCase(), password)
                createAlert(t('login.authenticate'))
                history.push('/home')
            } catch (error) {
                createAlert(getErrorMessage(error), 'error')
            } finally {
                setLoading(false)
            }
        }

    }


    return (
        <div className='login'>
            <div className='login__box'>

                <Input
                    label={t('login.email')}
                    onChange={(value) => {
                        setErrorEmail('')
                        setEmail(value)
                    }}
                    error={t(errorEmail)}
                    onKeyPress={() => {
                        passwordRef.current && passwordRef.current.focus()
                    }}
                />
                <Input
                    type='password'
                    inputRef={passwordRef}
                    label={t('login.password')}
                    onChange={(value) => {
                        setErrorPassword('')
                        setPassword(value)
                    }}
                    error={t(errorPassword)}
                    onKeyPress={handlerSubmit}

                />
                <Button text={t('login.loginButton')} loading={loading} onClick={handlerSubmit} />
                <Button type='link' size={14} onClick={() => history.push('/register')} text={t('login.notRegister')} />
            </div>
        </div>
    )
}
const state2props = () => ({
})
const dispatch2props = {
    createAlert,
    userLogin
}

export const Login = connect(state2props, dispatch2props)(LoginBase)