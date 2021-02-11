import React from 'react';
import { useLocation } from 'react-router-dom'
import './styles.css'
export const NotFound = () => {
    const { pathname } = useLocation()

    return (
        <div className='not-found'>
            <h1>Not Found... 😅</h1>
            <p>{`route Name: ${pathname}`}</p>
        </div>
    )
}