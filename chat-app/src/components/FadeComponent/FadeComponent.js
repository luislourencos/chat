import React from 'react';
import Fade from 'react-reveal/Fade';

export const FadeComponent = ({ childrens, right = false, left = false }) => {
    return (
        <div>
            <Fade right={right} left={left}>
                {childrens}
            </Fade>
        </div>
    )
} 