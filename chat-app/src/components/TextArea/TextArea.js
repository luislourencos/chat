import React, { useState } from 'react';
import './styles.css'

export const TextArea = ({ onChange = () => { }, value, placeholder, minRows = 2, maxRows = 20, onKeyPress = () => { } }) => {
    const [rows, setRows] = useState(1)



    const handleChange = (event) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;
        event.target.rows = minRows;
        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }
        onChange(event.target.value)
        setRows(currentRows < maxRows ? currentRows : maxRows)
        console.log(event.target.key)

    };

    const handleKeyPress = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            console.log('press enter')
            onKeyPress()
        }
    }


    return (
        <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            className='textarea'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );

}