import React from 'react';
import Fade from 'react-reveal/Fade';

export const FadeLanding = ({ text = 'insert some text', right = false, left = false }) => {
    return (
        <div>
            <Fade right={right} left={left}>
                <h1>{text}</h1>
            </Fade>
        </div>
    )
} 