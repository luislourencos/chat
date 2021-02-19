import React, { useEffect, useState, useCallback, useRef } from 'react';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';

import { createMessage, getMessage } from '../../services/MessageService';
import { createAlert } from '../../actions/AlertActions'
import { getRoom } from '../../services/RoomService'
import { getErrorMessage } from '../../utils';
import { ContentLoader } from '../../components/ContentLoader';
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Message } from '../../components/Message'
import send from '../../icons/send.png'

import './styles.sass'
import dotenv from 'dotenv';
import { Alert } from '../../components/Alert';

dotenv.config()
const REACT_APP_URL = process.env.REACT_APP_URL

const ChatRoomBase = ({ createAlert, user }) => {
    const { t } = useTranslation()
    const { roomId } = useParams();
    const { params } = useLocation();
    const [dataRoom, setDataRoom] = useState(params)
    const [loading, setLoading] = useState(true);
    const [dataMessage, setDataMessage] = useState([]);
    const [userInfo, setUserInfo] = useState('')
    const [textMessage, setTextMessage] = useState('');
    const [usersList, setUsersList] = useState([user.id])


    const fetchRoom = useCallback(
        async () => {
            try {
                const [room] = await getRoom(roomId)
                setDataRoom(room)
            } catch (error) {
                createAlert(getErrorMessage(error), 'error')
            } finally {
                setLoading(false)
            }

        }, [createAlert, roomId]
    )
    const fetchMessagesHistoric = useCallback(
        async () => {
            setLoading(true)
            try {
                const messages = await getMessage(roomId)
                setDataMessage(messages)
            } catch (error) {
                createAlert(getErrorMessage(error), 'info')
            } finally {
                setLoading(false)
            }
        }, [createAlert, roomId]
    )

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current && divRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [dataMessage])


    useEffect(() => {
        if (!params) {
            fetchRoom()
        }
        fetchMessagesHistoric()

        const socket = socketIOClient(REACT_APP_URL);
        socket.emit('join_room', roomId)
        socket.on('connectingUser', (_user) => {

            if (_user.userId !== user.id) {
                setUserInfo(t('chat.connect') + ' ' + _user.userName, 'info')
                setTimeout(() => { setUserInfo('') }, 3000)
            }
            setUsersList(_user.listRoomUsers)

        })
        socket.emit('connectingUser', { roomId, userName: user.name, userId: user.id })

        socket.on('message', (_data) => {
            setDataMessage((data) => [...data, _data])
        })
        //userConnect
        //UserDisconnect
        socket.on('userDisconnect', (_user) => {
            if (_user.userId !== user.id) {
                setUserInfo(t('chat.disconnect') + ' ' + _user.userName, 'info')
                setTimeout(() => { setUserInfo('') }, 3000)
            }
            setUsersList(_user.listRoomUsers)
        })


        return () => {
            socket.emit('userDisconnect', { userName: user.name, roomId, userId: user.id })
            socket.disconnect()
        }
    }, [params, fetchMessagesHistoric, roomId, user.id, user.name])

    const handlerSend = async () => {
        if (textMessage.trim()) {
            const socket = socketIOClient(REACT_APP_URL);
            socket.emit('message', { roomId, message: textMessage, userId: user.id, userName: user.name })
            try {
                await createMessage(roomId, textMessage)
                setTextMessage('')
            } catch (error) {
                createAlert(getErrorMessage(error), 'error')
            }
        }
    }

    if (loading) {
        return <ContentLoader />
    }
    return (
        <div className='chat-room'>
            {!!userInfo && <div className='chat-room__info'>
                <Fade right>
                    <Alert message={userInfo} type='info' onClick={() => setUserInfo('')} colorAlert='#097FC4' />
                </Fade>
            </div>}
            <div className='chat-room__header'>
                <h2 className={'chat-room__header-title'}>{t('room.name') + ': ' + (dataRoom && dataRoom.name) || ''}</h2>
            </div>
            <div className='chat-room__body'>
                <div className='chat-room__body-child'>
                    {dataMessage && dataMessage.map((message) => (
                        <div key={message.date + `${Math.random()}`}>
                            <Message data={message} direction={user.id === message.userId ? 'right' : 'left'} userIsLoged={usersList.includes(message.userId)} />

                        </div>
                    ))}
                    <div ref={divRef}></div>
                </div>
            </div>
            <div className='chat-room__send'>
                <div className='chat-room__input'>
                    <TextArea onChange={(value) => setTextMessage(value)} value={textMessage} onKeyPress={handlerSend} />
                </div>
                <div className='chat-room__button'>
                    <Button height='100%' onClick={handlerSend} >
                        <img src={send} alt='' className='chat-room__icon' />
                    </Button>
                </div>
            </div>

        </div>

    )
}
const state2props = (state) => ({
    user: state.user.user
});
const dispatch2props = {
    createAlert
}
export const ChatRoom = connect(state2props, dispatch2props)(ChatRoomBase) 