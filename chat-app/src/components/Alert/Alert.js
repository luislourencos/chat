import React from 'react';
import './styles.css';
import close from '../../icons/close.png'

export const Alert = ({ message, type = 'success', onClick }) => {
    let color, backgroundColor;
    switch (type) {
        case 'success':
            color = 'white';
            backgroundColor = 'green';
            break;
        case 'error':
            color = 'white';
            backgroundColor = 'red';
            break;
        case 'warning':
            color = 'black';
            backgroundColor = 'yellow';
            break;

        default:
            break;
    }


    return (
        <div className='error' style={{ color, backgroundColor }}>
            <div className='error__message'>
                <p>{message}</p>
            </div>
            <button className='error__button' onClick={onClick}>
                <img className='error__icon' src={close} alt='close' />
            </button>
        </div>
    )
}