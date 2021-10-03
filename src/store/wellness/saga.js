import { getExistingWellness, putExistingWellness } from "./action"
import { takeLatest, call, put, all } from 'redux-saga/effects'
import { getExistingWellnessAPI } from "../../api"
import { closeAlert, triggerAlert } from "../alert/action"
import { openLoading, closeLoading } from "../loading/action"
import { enableWellness } from "../button/action"
import { enableNextForWellness } from "../Next/action"

export function* addExistingWellness(apiData) {
    try {
        yield put(openLoading())
        const { data, status } = yield call(getExistingWellnessAPI, apiData)
        if (status === 200) {
            yield put(putExistingWellness(data))
            yield put(closeAlert())
            yield put(triggerAlert({
                message: 'Wellness Template successfully retrieved from mongo',
                severity: 'success',
                isVisible: true
            }))
            yield put(enableWellness())
            yield put(enableNextForWellness())
        }
    }
    catch (error) {
        console.log(error)
        yield put(closeAlert())
        yield put(triggerAlert({
            message: 'Failed to retreive the template from mongo',
            severity: 'error',
            isVisible: true
        }))

    }
    yield put(closeLoading())
}

export default function* wellnessManager() {
    yield all([
        takeLatest(getExistingWellness, addExistingWellness)
    ])
}