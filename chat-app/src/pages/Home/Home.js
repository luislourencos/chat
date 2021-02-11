import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getErrorMessage, validateEmpty } from '../../utils';
import { createAlert } from '../../actions/AlertActions'
import { actionGetRoom, actionCreateRoom, actionUpdateRoom, actionDeleteRoom } from '../../actions/RoomActions'
import { RoomItem } from '../../components/RoomItem/RoomItem';
import { Spinner } from '../../components/Spinner';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';


export const HomeBase = ({
    createAlert,
    actionGetRoom,
    actionCreateRoom,
    actionUpdateRoom,
    actionDeleteRoom,
    user,
    room,
    roomFetch }) => {
    const { t } = useTranslation()
    const history = useHistory()
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [modalType, setModalType] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingCreated, setLoadingCreted] = useState(false)
    const [modalCreate, setModalCreate] = useState(false);

    useEffect(() => {
        try {
            if (!roomFetch) {
                actionGetRoom()
            }
        } catch (error) {
            createAlert(getErrorMessage(error), 'error')
        } finally {
            setLoading(false)
        }
    }, [roomFetch, actionGetRoom, createAlert])

    const handleRoom = async () => {
        setLoadingCreted(true)
        if (modalType !== 'delete' && validateEmpty(name)) {
            setErrorName(validateEmpty(name));
            setLoadingCreted(false)
        } else {
            try {
                if (modalType === 'create') {
                    await actionCreateRoom(name)
                    createAlert(t('room.createSuccess'))
                } else if (modalType === 'update') {

                    await actionUpdateRoom(currentRoom, name)
                    createAlert(t('room.updateSuccess'))
                } else if (modalType === 'delete') {
                    await actionDeleteRoom(currentRoom)
                    createAlert(t('room.deleteSuccess'))
                }
                setModalCreate(false)
            } catch (error) {
                console.log(error)
                createAlert(getErrorMessage(error), 'error')
            } finally {
                setLoadingCreted(false)
            }
        }
    }

    const handlerGoToRoom = (value) => {
        history.push({
            pathname: `/room/${value.id}`,
            params: value
        })
    }

    if (loading) {
        return (
            <Spinner />
        )
    }



    return (
        <div className='home'>
            <h1>Home</h1>
            <Button text={t('room.create')} onClick={() => {
                setModalType('create')
                setModalCreate(true)
            }} />
            {modalCreate && <Modal
                title={t(`room.${modalType}`)}
                loading={loadingCreated}
                closeModal={() => setModalCreate(false)}
                onSubmit={() => handleRoom()}
                submitText={t(`button.${modalType}`)}
            >
                {modalType === 'delete' ? (
                    <h3>{t('home.delete')}</h3>
                ) : (
                        <Input
                            text={'Nombre'}
                            onChange={(value) => {
                                setErrorName('')
                                setName(value)
                            }}
                            error={t(errorName)}
                        />)}
            </Modal>}
            <div className='home__rooms'>
                {room && room.length !== 0 && room.map((item) => (
                    <RoomItem
                        key={item.id}
                        data={item}
                        idCreator={user.id}
                        update={(value) => {
                            setModalType('update')
                            setCurrentRoom(value)
                            setModalCreate(true)
                        }}
                        remove={(value) => {
                            setModalType('delete')
                            setCurrentRoom(value)
                            setModalCreate(true)
                        }}
                        onClick={(value) => handlerGoToRoom(value)}
                    />))
                }
            </div>
        </div>
    )
}
const state2props = (state) => ({
    user: state.user.user,
    roomFetch: state.room.fetch,
    room: state.room.room,
})
const dispatch2props = {
    createAlert,
    actionGetRoom,
    actionCreateRoom,
    actionUpdateRoom,
    actionDeleteRoom
}
export const Home = connect(state2props, dispatch2props)(HomeBase)