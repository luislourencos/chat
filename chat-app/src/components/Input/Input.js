import React, { useState } from 'react';
import './styles.css'

export const Input = ({ backgroundColor = 'white', label = 'example', error = '', type = 'text', placeholder, value = '', onChange = () => { } }) => {
    const [errorMessage, setErrorMessage] = useState(error);
    const [inputValue, setInputValue] = useState(value)

    const handleOnChange = (event) => {
        event.preventDefault()
        setInputValue(event.target.value)
        setErrorMessage('')
        onChange(event.target.value)
    }
    return (
        <div className='input'>
            {label && <label className='input__label'>{label}</label>}
            <input outocomplete='off' className='input__box' style={errorMessage ? { borderColor: '#ed4337', backgroundColor } : { backgroundColor }} type={type} placeholder={placeholder} onChange={handleOnChange} value={inputValue} />

            {errorMessage ? <div className='input__error' >
                <p className='input__error-text' style={{ backgroundColor }}>{errorMessage}</p>
            </div> : <div className='input__error'></div>}
        </div>

    )
}