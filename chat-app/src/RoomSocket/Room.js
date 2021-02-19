

import React, { useState, useEffect } from 'react'
import './style.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";
export const Room = ({ roomId }) => {
    const [message, setMessage] = useState('')
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit('join_room', roomId)
        socket.on('userId', (user) => {
            setUserId(user)
        })

        socket.on('message', (_data) => {
            setData((data) => [...data, _data])
        })
        return () => socket.disconnect()
    }, [])

    const handlerInput = (event) => {
        setMessage(event.target.value)
    }

    const handlerSend = (event) => {
        const socket = socketIOClient(ENDPOINT);
        event.preventDefault()
        socket.emit('message', { roomId, message, userId })
        setMessage('')
    }

    return (
        <div>
            <h1>********* {roomId} ***********</h1>
            <div className='messages'>
                {data && data.map((_data, index) => {

                    return (
                        <div key={index} className={`boxContainer ${_data.userId === userId ? ('boxContainer--right') : ('boxContainer--left')}`}>
                            <div className={_data.userId === userId ? 'userBox' : 'anotherBox'}>
                                <p >{_data.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='send-message'>
                <form onSubmit={handlerSend}>
                    <input placeholder='write a message' onChange={handlerInput} value={message} />
                    <button >Send</button>
                </form>
            </div>
        </div>
    )
}