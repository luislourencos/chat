import React from 'react';
import './styles.css';


export const Alert = ({ message, type = 'success', onClick, colorAlert }) => {
    let color, backgroundColor, opacity;

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
        case 'info':
            color = 'white';
            backgroundColor = 'rgb(0,212,198)';
            break;
        default:
            break;
    }
    if (colorAlert) {
        backgroundColor = colorAlert
        opacity = '1'
    }

    return (
        <div className='error' style={{ color, backgroundColor, opacity }} onClick={onClick}>
            <div className='error__message'>
                <p>{message}</p>
            </div>
        </div>
    )
}