import { getExistingCasemap, putExistingCasemap } from './action'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import { getExistingCasemapAPI } from '../../api'
import { triggerAlert, closeAlert } from '../alert/action'
import { closeLoading, openLoading } from '../loading/action'
import { enableCasemap } from "../button/action"
import { enableNextForCasemap } from '../Next/action'

export function* addExistingCasemap(apiData) {
    try {
        yield put(openLoading())
        const { data, status } = yield call(getExistingCasemapAPI, apiData)
        if (status === 200) {
            yield put(putExistingCasemap(data))
            yield put(closeAlert())
            yield put(triggerAlert({
                message: "Successfully retreived casemap from mongo",
                severity: "success",
                isVisible: true
            }))
            yield put(enableCasemap())
            yield put(enableNextForCasemap())

        }
    }
    catch (error) {
        console.log(error)
        yield put(triggerAlert({
            message: "Failed to retreive casemap from mongo",
            severity: "error",
            isVisible: true
        }))
    }
    yield put(closeLoading())
}

export default function* casemapManager() {
    yield all([
        takeLatest(getExistingCasemap, addExistingCasemap)
    ])
}