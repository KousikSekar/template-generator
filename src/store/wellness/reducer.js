import { addWellness, putExistingWellness } from './action'
import { handleActions } from 'redux-actions'

const initialState = {
    wellness: "{}"
}

const handlers = {
    [addWellness]: (state, action) => {
        let wellness = action.payload
        return {
            ...state,
            wellness
        }
    },
    [putExistingWellness]: (state, action) => {
        let wellness = JSON.stringify(action.payload.template)
        return {
            ...state,
            wellness
        }
    }
}

export default handleActions(handlers, initialState)