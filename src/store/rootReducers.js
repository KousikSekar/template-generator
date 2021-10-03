
import { combineReducers } from 'redux'
import casemapReducer from './casemap/reducer'
import wellnessReducer from './wellness/reducer'
import alertReducer from './alert/reducer'
import loadingReducer from './loading/reducer'
import correlationAndHealthChecksReducer from './correlationsAndHealthchecks/reducer'
import previewReducer from './preview/reducer'
import buttonReducer from './button/reducer'
import nextReducer from './Next/reducer'

const rootReducers = combineReducers({
    casemapReducer,
    wellnessReducer,
    alertReducer,
    loadingReducer,
    correlationAndHealthChecksReducer,
    previewReducer,
    buttonReducer,
    nextReducer
})

export default rootReducers