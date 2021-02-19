import React from 'react';
import './styles.css'
import user from '../../icons/user.png'
import moment from 'moment';
import es from 'moment/locale/es'


export const Message = ({ data = {}, direction = 'left', colorLeft = 'rgb(134,187,113)', colorRight = 'rgb(149,194,237)', letterColor = 'white', userIsLoged = false }) => {
    const lng = localStorage.getItem('language') || 'en'
    const date = moment(data.date).locale([lng]).calendar()

    return (

        <div className={direction === 'left' ? ('message message--left') : ('message message--right')}  >
            <div className={`message__box ${direction === 'left' ? ('message__box--left') : ('message__box--right')}`} style={{ backgroundColor: `${direction === 'left' ? colorLeft : colorRight}` }}>
                <div className='message__profile'>
                    <img src={user} alt='' className={'message__user'} />
                    <div className='message__name'>{data.userName}</div>
                </div>
                <div className='message__text' style={{ color: letterColor }}>{data.message}</div>
                <div className='message__info'>
                    <div className='message__date'>{date}</div>
                    <div className='message__loged' style={{ backgroundColor: `${userIsLoged ? '#2eb82e' : '#cc0000'}` }}></div>
                </div>
            </div>
        </div >

    )
}