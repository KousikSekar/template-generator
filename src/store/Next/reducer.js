import { handleActions } from "redux-actions";
import { enableNextForWellness, enableNextForCasemap, enableNextForCandh } from "./action";

const initialState = {
    disableWellnessNext: true,
    disableCasemapNext: true,
    disableCandhNext: true
}

const handlers = {
    [enableNextForWellness]: (state) => {
        return {
            ...state,
            disableWellnessNext: false
        }
    },
    [enableNextForCasemap]: (state) => {
        return {
            ...state,
            disableCasemapNext: false
        }
    },
    [enableNextForCandh]: (state) => {
        return {
            ...state,
            disableCandhNext: false
        }
    }
}
export default handleActions(handlers, initialState)