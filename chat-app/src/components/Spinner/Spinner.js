import React from 'react';
import './styles.css'
import PropTypes from 'prop-types'
export const Spinner = ({ color = 'green', size = 36, loading = false }) => {

    return (
        <div>
            {loading && <div className='spinner' style={{ borderColor: color, borderLeftColor: 'rgba(0,0,0,.1)', borderRightColor: 'rgba(0,0,0,.1)', width: `${size}px`, height: `${size}px`, borderWidth: `${0.16 * size}px` }}></div>}
        </div>
    )
}

Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    loading: PropTypes.bool,
}