import { handleActions } from "redux-actions";
import { enableCasemap, enableWellness } from "./action";


const initialState = {
    disableCasemap: true,
    disableWellness: true,
    disableNext: true
}

const handlers = {
    [enableCasemap]: (state) => {
        return {
            ...state,
            disableCasemap: false
        }
    },
    [enableWellness]: (state) => {
        return {
            ...state,
            disableWellness: false
        }
    },
}

export default handleActions(handlers, initialState)