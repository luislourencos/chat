import React from 'react';
import './styles.css'
import user from '../../icons/user.png'
export const Message = ({ data = {}, direction = 'left', colorLeft = 'green', colorRight = 'silver', letterColor = 'white' }) => {
    console.log(data)
    return (
        <div className='message' style={{ justifyContent: `${direction === 'left' ? 'flex-start' : 'flex-end'}` }}>
            <div className={`message__box`} style={{ backgroundColor: `${direction === 'left' ? colorLeft : colorRight}` }}>
                <img src={user} alt='' className={'message__user'} />
                <div className='message__text' style={{ color: letterColor }}>{'nbfjksdgfjkgsd skdsdjkhfjds sdjhfkjsdhf jfgsjd fgjsfgjdgsfhjgs dfhjgsdfjhgsdjgsfgsgdfhjgsdf gsjfgdgsfhjgsdfsdfsdfhjdgsjhgsdhjgsdfjhgsdfs dfsdfsdfsdfsdfsdfsdfsdfhgsdjfgsjfgdhsgfhjdgsfjs'}</div>
            </div>
        </div>
    )
}