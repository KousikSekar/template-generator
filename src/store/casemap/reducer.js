import { addCasemap, putExistingCasemap } from './action'
import { handleActions } from 'redux-actions'

const initialState = {
    ConditionName: "",
    Name: "",
    AlertType: [],
    Version: 0,
    Enabled: true,
    UpdateSnooze: 0,
    Snooze: 0,
    RunInterval: 0,
    SignaturesToRun: [],
    CorrelationSignaturesToRun: [],
}

const handlers = {
    [addCasemap]: (state, action) => {
        let casemap = action.payload
        console.log(casemap)
        return {
            ...state,
            ConditionName: casemap.ConditionName,
            Name: casemap.Name,
            AlertType: casemap.AlertType,
            Version: 0,
            Enabled: true,
            UpdateSnooze: casemap.UpdateSnooze,
            Snooze: casemap.Snooze,
            RunInterval: casemap.RunInterval,
            SignaturesToRun: casemap.SignaturesToRun,
            CorrelationSignaturesToRun: casemap.CorrelationSignaturesToRun,
        }
    },

    [putExistingCasemap]: (state, action) => {
        let casemap = action.payload.casemap
        // console.log(casemap)
        return {
            ...state,
            ConditionName: casemap.ConditionName ? casemap.ConditionName : null,
            Name: casemap.Name,
            AlertType: casemap.AlertType ? casemap.AlertType : [],
            Version: 0,
            Enabled: true,
            UpdateSnooze: casemap.UpdateSnooze ? casemap.UpdateSnooze : null,
            Snooze: casemap.Snooze ? casemap.Snooze : null,
            RunInterval: casemap.RunInterval ? casemap.RunInterval : null,
            SignaturesToRun: casemap.SignaturesToRun ? casemap.SignaturesToRun : null,
            CorrelationSignaturesToRun: casemap.CorrelationSignaturesToRun ? casemap.CorrelationSignaturesToRun : null,
        }
    }
}

export default handleActions(handlers, initialState)