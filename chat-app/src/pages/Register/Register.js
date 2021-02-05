import React from 'react';
import './styles.sass'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const Register = () => {

    const { t } = useTranslation();
    const history = useHistory()

    return (
        <div className='login'>
            <div className='login__box'>
                <Input label={t('login.name')} />
                <Input label={t('login.email')} />
                <Input label={t('login.password')} />
                <Button text={t('login.registerButton')} />
                <a onClick={() => history.push('/login')}>{t('login.isRegister')}</a>
            </div>
        </div>
    )
}