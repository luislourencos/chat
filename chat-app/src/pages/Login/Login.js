import React from 'react';
import './styles.sass'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'

export const Login = () => {
    const { t } = useTranslation();
    const history = useHistory()


    return (
        <div className='login'>
            <div className='login__box'>
                <Input label={t('login.email')} />
                <Input label={t('login.password')} />
                <Button text={t('login.loginButton')} />
                <a onClick={() => history.push('/register')}>{t('login.notRegister')}</a>
            </div>
        </div>
    )
}