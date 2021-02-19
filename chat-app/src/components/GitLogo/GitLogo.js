import React from 'react'
import github from '../../icons/github.png'
import './styles.css'
export const GitLogo = () => {
    return (
        <div className='logo'>
            <div onClick={() => window.open('https://github.com/luislourencos/chat', '_blank')}>
                <img src={github} alt='' className='logo-image' />
            </div>
            <div>
                <a onClick={() => window.open('mailto:luis.lourencos@gmail.com')}>luis.lourencos@gmail.com</a>
            </div>

        </div>
    )
}