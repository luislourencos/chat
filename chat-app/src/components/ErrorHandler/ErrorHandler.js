import React from 'react';
import { removeAlert } from '../../actions/AlertActions';
import { connect } from 'react-redux';
import { Alert } from '../Alert'
import './styles.css'


const ErrorHandlerBase = ({ alerts, removeAlert }) => {
    console.log(alerts)
    return (<div className='error-handler'>
        {
            alerts.map(alert => {
                return (
                    <Alert
                        key={alert.id}
                        message={alert.message}
                        type={alert.type}
                        onClick={() => removeAlert(alert.id)}
                    />)
            })
        }
    </div>)


}
const state2props = (state) => ({
    alerts: state.alerts,
});

const dispatch2props = {
    removeAlert,
};

export const ErrorHandler = connect(state2props, dispatch2props)(ErrorHandlerBase);