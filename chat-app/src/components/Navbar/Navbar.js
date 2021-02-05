import React from 'react';
import './styles.css'
export const Navbar = ({ fields, logo = 'logo' }) => {
    return (
        <div className='navbar'>
            {logo && <div className='navbar__logo'>
                {logo}
            </div>}
            <div className='navbar__fields'>
                {fields && fields.map((field, index) => (
                    <p onClick={() => console.log('Click', field.name)} className='navbar__field' key={index + ''}>{field.name}</p>
                ))}
            </div>

        </div>
    )
}