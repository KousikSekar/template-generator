import { triggerAlert, closeAlert } from './action'
import { handleActions } from 'redux-actions'

const initialState = {
    message: '',
    severity: 'info',
    isVisible: false,
    duration: 0
}

const handlers = {
    [triggerAlert]: (state, action) => {
        let alertData = action.payload
        // console.log(alertData)
        return {
            ...state,
            message: alertData.message,
            severity: alertData.severity,
            isVisible: true,
            duration: 10000
        }
    },

    [closeAlert]: (state) => {
        return {
            ...state,
            message: '',
            severity: 'info',
            isVisible: false,
            // duration: 0
        }
    }
}

export default handleActions(handlers, initialState)