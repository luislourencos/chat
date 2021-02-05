
import React from 'react';
import './styles.css';
import chat_logo from '../../icons/chat_logo.png';
import { Button } from '../../components/Button';
import { useHistory } from 'react-router-dom'
import { createAlert } from '../../actions/AlertActions'
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../lang/i18next'
import { connect } from 'react-redux'

const PublicNavbarBase = ({ createAlert, buttonLogin = false }) => {
    const { t } = useTranslation()
    const history = useHistory()
    const handlerPress = (lng) => {
        createAlert(t(`language.${lng}`))
    }
    return (
        <div className='navbar__header'>
            <img className='navbar__logo' alt='logo' src={chat_logo} onClick={() => history.push('/')} />
            <div className='navbar__button'>
                <Button text='en' type='link' onClick={() => {
                    changeLanguage('en')
                    handlerPress('en')
                }
                } />
                <Button text='es' type='link' onClick={() => {
                    changeLanguage('es')
                    handlerPress('es')
                }
                } />
                {buttonLogin && <Button backgroundColor={'#097FC4'} text={t('login.loginButton')} onClick={() => {
                    history.push('/login')
                }}
                />}
            </div>
        </div>
    )
}

const state2props = () => { };
const distach2props = {
    createAlert
}
export const PublicNavbar = connect(state2props, distach2props)(PublicNavbarBase)

