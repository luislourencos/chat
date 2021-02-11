import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { useLocation, useParams } from "react-router-dom";
import { createAlert } from '../../actions/AlertActions'
import { getRoom } from '../../services/RoomService'
import { getErrorMessage } from '../../utils';
import { ContentLoader } from '../../components/ContentLoader';
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Message } from '../../components/Message'
import './styles.sass'
import { useTranslation } from 'react-i18next';
const ChatRoomBase = ({ createAlert }) => {
    const { t } = useTranslation()
    const { roomId } = useParams();
    const { params } = useLocation();
    const [dataRoom, setDataRoom] = useState(params);
    const [loading, setLoading] = useState(true)
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


    useEffect(() => {
        if (!params) {
            fetchRoom()
        }

        setLoading(false)
    }, [params, fetchRoom])

    if (loading) {
        return <ContentLoader />
    }


    return (
        <div className='chat-room'>
            <div className='chat-room__header'>
                <p>header</p>
            </div>
            <div className='chat-room__body'>
                <div className='chat-room__body-child'>
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                </div>
            </div>
            <div className='chat-room__send'>
                <div className='chat-room__input'>
                    <TextArea onChange={(value) => console.log(value)} />
                </div>
                <div className='chat-room__button'>
                    <Button text={t('chat.button')} height='100%' />
                </div>
            </div>

        </div>

    )
}
const state2props = () => ({});
const dispatch2props = {
    createAlert
}
export const ChatRoom = connect(state2props, dispatch2props)(ChatRoomBase) 