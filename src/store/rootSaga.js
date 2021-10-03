
import { all } from 'redux-saga/effects'
import casemapManager from './casemap/saga'
import wellnessManager from './wellness/saga'

function* rootSaga() {
    yield all([
        casemapManager(),
        wellnessManager(),
    ])
}

export default rootSaga