import { handleActions } from 'redux-actions'
import { openLoading, closeLoading } from './action'

const initialState = {
    show: false
}

const handlers = {
    [openLoading]: (state) => {
        return {
            ...state,
            show: true
        }
    },

    [closeLoading]: (state) => {
        return {
            ...state,
            show: false
        }
    },
}

export default handleActions(handlers, initialState)