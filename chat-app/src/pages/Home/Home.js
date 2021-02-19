import React, { useState, useEffect, Children } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getErrorMessage, validateWordLength } from '../../utils';
import { createAlert } from '../../actions/AlertActions'
import { actionGetRoom, actionCreateRoom, actionUpdateRoom, actionDeleteRoom } from '../../actions/RoomActions'
import { RoomItem } from '../../components/RoomItem/RoomItem';
import { Spinner } from '../../components/Spinner';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import search from '../../icons/search.png'
import add from '../../icons/add.png'
import pencil from '../../icons/pencil.png'
import garbage from '../../icons/delete.png'

import socketIOClient from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config()
const REACT_APP_URL = process.env.REACT_APP_URL

export const HomeBase = ({
    createAlert,
    actionGetRoom,
    actionCreateRoom,
    actionUpdateRoom,
    actionDeleteRoom,
    user,
    room,
    roomFetch
}) => {
    const { t } = useTranslation()
    const history = useHistory()
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('0');
    const [errorTheme, setErrorTheme] = useState('')
    const [errorName, setErrorName] = useState('');
    const [modalType, setModalType] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingCreated, setLoadingCreted] = useState(false)
    const [modalCreate, setModalCreate] = useState(false);
    const [searchRooms, setSearchRooms] = useState();
    const [roomsWithUsers, setRoomsWithUsers] = useState([])

    const addListUsers = (list, room) => {
        const roomsWithUsersNumber = room.length !== 0 && room.map((item) => {
            if (typeof list[item.id] !== undefined) {
                item.numberUsers = list[item.id] || []
            } else {
                item.numberUsers = []
            }
            return item
        }) || []
        //sot by number of users
        const _roomsWithUsersNumber = roomsWithUsersNumber.sort((a, b) => {
            if (a.numberUsers.length > b.numberUsers.length) {
                return -1;
            }
            if (a.numberUsers.length < b.numberUsers.length) {
                return 1;
            }
            return 0;
        })
        setRoomsWithUsers(_roomsWithUsersNumber)
    }

    useEffect(() => {
        setRoomsWithUsers(room)
        const socket = socketIOClient(REACT_APP_URL);
        socket.on('historicUsers', list => {
            addListUsers(list, room)
        })
        socket.on('listConnectingUsers', list => {
            addListUsers(list, room)
        })
        try {
            if (!roomFetch) {
                actionGetRoom()
            }
        } catch (error) {
            createAlert(getErrorMessage(error), 'error')
        } finally {
            setLoading(false)
        }
        return () => socket.disconnect()
    }, [roomFetch, actionGetRoom, createAlert, room])

    const handleRoom = async () => {
        setLoadingCreted(true)


        if (modalType !== 'delete' && validateWordLength(name)) {
            if (theme == 0) {
                setErrorTheme('error.theme')
            }
            setErrorName(validateWordLength(name));
            setLoadingCreted(false)
        } else {
            try {
                if (modalType === 'create') {
                    await actionCreateRoom(name, theme)
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
    const handlerSearch = (value) => {
        const searchRooms = roomsWithUsers.filter(({ name, idCreator }) => {
            return name.toLowerCase().includes(value.toLowerCase()) || idCreator.name.toLowerCase().includes(value.toLowerCase())
        })
        setSearchRooms(searchRooms)
    }

    if (loading) {
        return (
            <Spinner />
        )
    }



    return (
        <div className='home'>
            <div className='home__header'>
                <div>
                    <p className='home__description'>{t('home.descriptionTitle')}</p>
                    <p className='home__description'>{t('home.description')}</p>
                </div>
                <div className='home__controls'>
                    <div className='home__search'>
                        <Input placeholder={t('home.search')} onChange={handlerSearch} className='home__search-input' />
                        <img src={search} alt='' className='home__search-image' />
                    </div>
                    <div className='home__search-button'>
                        <Button
                            backgroundColor='#59DAFA'
                            height={'50px'}
                            borderRadius={60}
                            onClick={() => {
                                setModalType('create')
                                setModalCreate(true)
                            }} >
                            <img src={add} className='home__add' alt='' />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='home__rooms '>
                {searchRooms && searchRooms.length !== 0 && (
                    <div className='home__search-results'>
                        <p className='home__search-title'>{t('home.search')}</p>
                        <div className={'home__search-item'}>
                            {searchRooms.map((item) => (
                                <div className='home__search-card'>
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
                                        numberUsers={(item.numberUsers && item.numberUsers.length) || 0}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                )}


            </div>
            {modalCreate && <Modal
                title={t(`room.${modalType}`)}
                loading={loadingCreated}
                closeModal={() => setModalCreate(false)}
                onSubmit={() => handleRoom()}
                submitText={t(`button.${modalType}`)}
            >
                {modalType === 'delete' ? (
                    <div className='home__modal' >
                        <div className='home__modal-image'>
                            <img src={garbage} alt='' className='home__modal-icon' />
                        </div>
                        <h3>{t('home.delete')}</h3>
                    </div>
                ) : (
                        modalType === 'create' ? (
                            <div className='home__modal'>
                                <div className='home__modal-image'>
                                    <img src={pencil} alt='' className='home__modal-icon' />
                                </div>
                                <select className='home__modal-select' style={errorTheme ? { border: '1px solid red' } : {}} defaultValue='0' onChange={(e) => {
                                    setErrorTheme('')
                                    setTheme(e.target.value)
                                }}>
                                    <option value='0'>{t('home.selectTheme')}</option>
                                    <option value='1'>{t('home.news')}</option>
                                    <option value='2'>{t('home.food')}</option>
                                    <option value='3'>{t('home.sports')}</option>
                                    <option value='4'>{t('home.music')}</option>
                                </select>
                                <Input
                                    onKeyPress={handleRoom}
                                    placeholder={'Nombre'}
                                    onChange={(value) => {
                                        setErrorName('')
                                        setName(value)
                                    }}
                                    error={t(errorName)}
                                />
                            </div>
                        ) : (
                                <div className='home__modal'>
                                    <div className='home__modal-image'>
                                        <img src={pencil} alt='' className='home__modal-icon' />
                                    </div>
                                    <h3>{t('home.update')}</h3>
                                    <Input
                                        onKeyPress={handleRoom}
                                        placeholder={'Nombre'}
                                        onChange={(value) => {
                                            setErrorName('')
                                            setName(value)
                                        }}
                                        error={t(errorName)}
                                    />
                                </div>
                            ))}
            </Modal>}


            <div className='home__rooms'>
                {roomsWithUsers && roomsWithUsers.length !== 0 && roomsWithUsers.map((item) => (
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
                        numberUsers={(item.numberUsers && item.numberUsers.length) || 0}
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
    actionDeleteRoom,

}
export const Home = connect(state2props, dispatch2props)(HomeBase)