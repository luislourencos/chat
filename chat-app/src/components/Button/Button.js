import React from 'react';
import './styles.css';
import { Spinner } from '../Spinner';
import PropTypes from 'prop-types';

export const Button = ({
    text = '',
    onClick = () => { },
    loading = false,
    type = 'primary',
    size = 16,
    fontWeight = 'bold',
    textTransform = 'none',
    borderRadius = 3,
    backgroundColor,
    height = '35px',
    children
}) => {
    let color, backgroundColorType
    switch (type) {
        case 'primary':
            color = 'white';
            backgroundColorType = 'rgb(1,123,254)'
            break;
        case 'secondary':
            color = 'white';
            backgroundColorType = 'rgb(108,117,125)'
            break;
        case 'success':
            color = 'white';
            backgroundColorType = 'rgb(39,167,68)'
            break;
        case 'danger':
            color = 'white';
            backgroundColorType = 'rgb(220,52,68)'
            break;
        case 'link':
            color = 'rgb(1,123,254)';
            backgroundColorType = 'transparent'
            break;

        default:
            color = 'white';
            backgroundColorType = 'grey'
            break;
    }

    return (
        <button className={type === 'link' ? 'button' : 'button button--shadow'} style={{
            color,
            backgroundColor: backgroundColor || backgroundColorType,
            fontSize: `${size}px`,
            fontWeight,
            textTransform,
            borderRadius: `${borderRadius}px`,
            height: `${height}`
        }} onClick={!loading ? () => onClick() : () => { }}>
            {children}
            {loading ? <Spinner size={20} loading={loading} color={color} /> : <p>
                {text}
            </p>}
        </button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    loading: PropTypes.bool,
    size: PropTypes.number,
    fontWeight: PropTypes.oneOf(['none', 'bold']),
    borderRadius: PropTypes.number,
    type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'link']),
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

