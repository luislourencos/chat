import React from 'react';
import './styles.sass';
import chat from './chat2.jpg';
import { FadeLanding } from '../../components/FadeLanding/FadeLanding';


export const Landing = () => {

    return (
        <div className='landing'>
            <div>
                <img className='landing__image' alt='' src={chat} />
            </div>
            <div className='landing__description'>
                <p className='landing__description-text'>The chat is used to communicate with groups of people who think about different topics and are entertained even with tools such as video chat and sending links to see other pages, criticize them and like them. There are ways to express yourself through the network, such as; sending emoticons that represent; simple, sad, happy, surprised faces, screaming, crying or making gestures with parts of the face. There are also different types of chat or also discussion groups</p>
            </div>
            <div style={{ margin: '200px' }}>
                <FadeLanding right />
            </div>
        </div>



    )
}
