import React from 'react';
import './styles.css'
import { Button } from '../Button';
import close from '../../icons/close.png'
export const Modal = ({
    children,
    submitText = 'example',
    onSubmit = () => { },
    loading = false,
    title = 'title',
    closeModal = () => { }
}) => {

    return (
        <div className='modal'>
            <div className='modal__box'>
                <div className='modal__header'>
                    {!!title && <p className='modal__title'>{title}</p>}
                    <img
                        className='modal__close'
                        src={close}
                        alt='close'
                        onClick={() => closeModal()} />
                </div>
                {children}
                <div className='modal__submit'>
                    <Button text={submitText} onClick={() => onSubmit()} loading={loading} />
                </div>
            </div>

        </div>
    )
}