import React from 'react';
import './styles.css'
import pencil from '../../icons/pencil.png'
import garbage from '../../icons/delete.png'
import user from '../../icons/user.png'
import chat from '../../icons/chat.png'
import chronometer from '../../icons/chronometer.png'
import create from '../../icons/create.png'
import music from '../../icons/music.jpg'
import food from '../../icons/food.jpg'
import sports from '../../icons/sports.jpg'
import news from '../../icons/news.jpg'
import moment from 'moment'
import es from 'moment/locale/es'

export const RoomItem = ({ data, idCreator, update = () => { }, remove = () => { }, onClick = () => { }, numberUsers }) => {
    const lng = localStorage.getItem('language') || 'en'
    const date = moment(data.date).locale([lng]).calendar()
    let imageTheme = news;

    switch (data.theme) {
        case '1':
            imageTheme = news
            break;
        case '2':
            imageTheme = food
            break;
        case '3':
            imageTheme = sports
            break;
        case '4':
            imageTheme = music
            break;
        default:
            break;
    }

    return (
        <div className='room-item' style={{ backgroundImage: `url(${imageTheme})` }}>
            <div className='room-item__header'>
                {idCreator === data.idCreator._id && <img className='room-item__icon' alt='' src={pencil} onClick={() => update(data.id)} />}
                {idCreator === data.idCreator._id && <img className='room-item__icon' alt='' src={garbage} onClick={() => remove(data.id)} />}
            </div>
            <div onClick={() => onClick(data)} className='room-item__users'>
                <div>
                    <div className={'room-item__user-box'}>
                        <img src={chat} alt='' className={'room-item__user'} />
                        <p className={'room-item__number'} >{data.name}</p>
                    </div>
                    <div className={'room-item__user-box'}>
                        <img src={user} alt='' className={'room-item__user'} />
                        <p className={'room-item__number'} style={numberUsers !== 0 ? { color: '#2FB82D' } : {}}>{numberUsers}</p>
                    </div>
                </div>
                <div>
                    <div className={'room-item__user-box room-item__user-box--end'}>
                        <p className={'room-item__number'} >{data.idCreator.name}</p>
                        <img src={create} alt='' className={'room-item__user'} />
                    </div>
                    <div className={'room-item__user-box room-item__user-box--end'}>
                        <p className={'room-item__number'} >{date}</p>
                        <img src={chronometer} alt='' className={'room-item__user'} />
                    </div>
                </div>

            </div>
        </div>
    )
}