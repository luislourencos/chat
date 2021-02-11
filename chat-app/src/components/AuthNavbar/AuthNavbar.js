
import React, { useState, useEffect } from 'react';
import './styles.css';
import chat_logo from '../../icons/chat_logo.png';
import { Button } from '../Button';
import { useHistory } from 'react-router-dom'
import { createAlert } from '../../actions/AlertActions';
import { userLogout } from '../../actions/UserActions';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../lang/i18next'
import { connect } from 'react-redux'

const AuthNavbarBase = ({ createAlert, userLogout }) => {
    const { t } = useTranslation()
    const history = useHistory()
    const handlerPress = (lng) => {
        createAlert(t(`language.${lng}`))
    }
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className='navbar__header' style={{ top: visible ? '0' : '-75px' }}>
            <img className='navbar__logo' alt='logo' src={chat_logo} onClick={() => history.push('/home')} />
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
                <Button backgroundColor={'#097FC4'} text={t('home.logout')} onClick={() => {
                    userLogout()
                    history.push('/')
                }}
                />
            </div>
        </div>
    )
}

const state2props = () => ({});
const distach2props = {
    createAlert,
    userLogout
}
export const AuthNavbar = connect(state2props, distach2props)(AuthNavbarBase)

