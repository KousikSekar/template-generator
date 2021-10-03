import { handleActions } from 'redux-actions'
import { openModal, closeModal, openForGetExisting } from './action'

const initialState = {
    show: false,
    component: "",
    callFromGetExisting: false

}

const handlers = {
    [openModal]: (state, Action) => {
        let preview = Action.payload
        return {
            ...state,
            show: true,
            component: preview.toShow,
            callFromGetExisting: false
        }
    },

    [closeModal]: (state) => {
        return {
            ...state,
            show: false,
            component: "",
            callFromGetExisting: false
        }
    },

    [openForGetExisting]: (state, Action) => {
        let preview = Action.payload
        return {
            ...state,
            show: true,
            component: preview.toShow,
            callFromGetExisting: true

        }
    }

}

export default handleActions(handlers, initialState)