import React, { useState } from 'react';
import './styles.css'

export const Input = ({ backgroundColor = 'white', label = 'example', error = '', type = 'text', placeholder, value = '', onChange = () => { } }) => {
    const [inputValue, setInputValue] = useState(value)

    const handleOnChange = (event) => {
        setInputValue(event.target.value)
        onChange(event.target.value)
    }
    const handlerKeyPress = (event) => {
        if (event.key === 'Enter') {

        }
    }
    return (
        <div className='input'>
            {label && <label className='input__label'>{label}</label>}
            <input onKeyPress={handlerKeyPress} outocomplete='off' className='input__box' style={error ? { borderColor: '#ed4337', backgroundColor } : { backgroundColor }} type={type} placeholder={placeholder} onChange={handleOnChange} value={inputValue} />

            {error ? <div className='input__error' >
                <p className='input__error-text' style={{ backgroundColor }}>{error}</p>
            </div> : <div className='input__error'></div>}
        </div>

    )
}