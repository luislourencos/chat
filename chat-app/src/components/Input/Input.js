import React, { useState } from 'react';
import './styles.css'

export const Input = ({ inputRef, backgroundColor = 'white', label = '', error = '', type = 'text', placeholder, value = '', onChange = () => { }, onKeyPress = () => { }, className }) => {
    const [inputValue, setInputValue] = useState(value)

    const handleOnChange = (event) => {
        setInputValue(event.target.value)
        onChange(event.target.value)

    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onKeyPress()
        }
    }

    return (
        <div className={`input`}>
            {label && <label className='input__label'>{label}</label>}
            <input
                ref={inputRef}
                onKeyPress={handleKeyPress}
                outocomplete='off'
                className={`input__box ${className}`}
                style={error ? { borderColor: '#ed4337', backgroundColor } : { backgroundColor }}
                type={type} placeholder={placeholder}
                onChange={handleOnChange}
                value={inputValue} />

            {error ? <div className='input__error' >
                <p className='input__error-text' style={{ backgroundColor }}>{error}</p>
            </div> : <div className='input__error'></div>}
        </div>

    )
}