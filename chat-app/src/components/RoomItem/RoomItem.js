import React from 'react';
import './styles.css'
import close from '../../icons/close.png'
import pen from '../../icons/pen.png'
export const RoomItem = ({ data, idCreator, update = () => { }, remove = () => { }, onClick = () => { } }) => {
    return (
        <div className='room-item' >
            <div className='room-item__header'>
                {idCreator === data.idCreator && <img className='room-item__icon' alt='' src={pen} onClick={() => update(data.id)} />}
                {idCreator === data.idCreator && <img className='room-item__icon' alt='' src={close} onClick={() => remove(data.id)} />}
            </div>
            <div onClick={() => onClick(data)}>
                <p>{data.name}</p>
                <p>{data.id}</p>
                <p>{data.idCreator}</p>
            </div>
        </div>
    )
}