import { addCorrelationAndHealthchecks } from "./action";
import { handleActions } from 'redux-actions'

const initialState = {
    CorrelatedCases: [],
    Database: "",
    Query: ""
}

const handlers = {
    [addCorrelationAndHealthchecks]: (state, Action) => {
        let cAndH = Action.payload
        return {
            ...state,
            CorrelatedCases: cAndH.CorrelatedCases,
            Database: cAndH.Database,
            Query: cAndH.Query
        }
    }
}

export default handleActions(handlers, initialState)