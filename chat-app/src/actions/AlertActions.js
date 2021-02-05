export const ALERT_CREATE = 'ALERT_CREATE';
export const ALERT_REMOVE = 'ALERT_REMOVE';

export const createAlert = (message, type) => (dispatch) => {
    const payload = { id: Math.random() + '', message, type };

    dispatch({ type: ALERT_CREATE, payload });
    setTimeout(() => removeAlert(payload.id)(dispatch), 5000);
}

export const removeAlert = (id) => (dispatch) => {
    const payload = id;
    dispatch({ type: ALERT_REMOVE, payload });
}