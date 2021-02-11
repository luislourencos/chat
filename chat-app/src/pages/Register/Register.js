import React, { useState } from 'react';
import './styles.sass'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { createAlert } from '../../actions/AlertActions'
import { connect } from 'react-redux';
import { register } from '../../services/UserService';
import { validateEmpty, validateEmail, validatePassword, getErrorMessage } from '../../utils'

export const RegisterBase = ({ createAlert }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation();
    const history = useHistory()


    const handlerSubmit = async () => {
        //validateFiels
        setLoading(true)
        setErrorName(validateEmpty(name));
        setErrorEmail(validateEmail(email));
        setErrorPassword(validatePassword(password));

        if (validateEmpty(name) || validateEmail(email) || validatePassword(password)) {
            return setLoading(false)
        } else {
            try {
                await register(name, email, password)
                createAlert(t('register.create'))
                history.push('/login')
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
                <Input label={t('login.name')}
                    onChange={(value) => {
                        setErrorName('')
                        setName(value)
                    }}
                    error={t(errorName)}
                />
                <Input
                    label={t('login.email')}
                    onChange={(value) => {
                        setErrorEmail('')
                        setEmail(value)
                    }}
                    error={t(errorEmail)}
                />
                <Input
                    label={t('login.password')}
                    onChange={(value) => {
                        setErrorPassword('')
                        setPassword(value)
                    }}
                    error={t(errorPassword)}

                />
                <Button text={t('login.registerButton')} loading={loading} onClick={handlerSubmit} />
                <Button type='link' size={14} onClick={() => history.push('/register')} text={t('login.notRegister')} />
            </div>
        </div>
    )
}
const state2props = () => { }
const dispatch2props = {
    createAlert
}

export const Register = connect(state2props, dispatch2props)(RegisterBase)