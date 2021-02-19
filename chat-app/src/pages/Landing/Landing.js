import React from 'react';
import './styles.sass';
import chat from './chat2.jpg';
import Fade from 'react-reveal/Fade';
import { useTranslation } from 'react-i18next';


export const Landing = () => {
    const { t } = useTranslation()
    return (
        <div className='landing'>
            <div>
                <img className='landing__image' alt='' src={chat} />
            </div>
            <div className='landing__fade'>
                <Fade right >
                    <div className='landing__description'>
                        <p className='landing__description-text'>{t('landing.description')}</p>
                    </div>
                </Fade>
            </div>
        </div>



    )
}
