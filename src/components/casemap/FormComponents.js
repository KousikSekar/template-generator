import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import SimpleInfo from '../../common/InfoBox';
import { openModal } from '../../store/preview/action';
import PreviewPanel from '../../common/Preview';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    addButton: {
        width: '35px',
        height: '25px',
    },
    fieldElements: {
        paddingLeft: '8px',
    },
    chipElements: {
        paddingLeft: '8px',
        display: 'flex',
        alignItems: 'center',
    },
    chipRoot: {
        width: '59vw',
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const CasemapFields = () => {

    const classes = useStyles();
    const casemapData = useSelector((state) => state.casemapReducer)
    const [alertTypes, setAlertTypes] = useState([]);
    const [decisions, setDecisions] = useState(["sigDefault"]);
    const [correlations, setCorrelations] = useState([]);
    const wellnessData = useSelector((state) => state.wellnessReducer)
    const [casemapObj, setCasemapObj] = useState({})
    const [infoParam, setInfoParam] = useState({
        info: "Please fill in appropriate details and click Save",
        variant: "outlined",
        severity: "info"
    });
    const [loadSaved, setLoadSaved] = useState(false)

    const template = JSON.parse(wellnessData.wellness)

    const [casemap, setCasemap] = useState({
        alertType: 0,
        automationCode: template._id ? template._id : "",
        updateSnooze: 24,
        snooze: 1,
        runInterval: 1,
        decision: "",
        correlation: "",
        conditionName: "",
    })

    useEffect(
        () => {
            setCasemap({
                alertType: 0,
                automationCode: template._id ? template._id : "",
                updateSnooze: casemapData.UpdateSnooze,
                snooze: casemapData.Snooze,
                runInterval: casemapData.RunInterval / 3600000000000,
                decision: template._id ? "sig" + template._id.charAt(0).toUpperCase() + template._id.substr(1) : "",
                correlation: template._id ? "sig" + template._id.charAt(0).toUpperCase() + template._id.substr(1) : "",
                conditionName: casemapData.ConditionName ? casemapData.ConditionName : "",
            })
            if (casemapData.SignaturesToRun) {
                setDecisions(casemapData.SignaturesToRun)
            }
            if (casemapData.CorrelationSignaturesToRun) {
                setCorrelations(casemapData.CorrelationSignaturesToRun)
            }
            if (casemapData.AlertType) {
                setAlertTypes(casemapData.AlertType)
            }
            // eslint-disable-next-line 
        }, [loadSaved])

    useEffect(() => {
        if (JSON.parse(wellnessData.wellness)._id) {
            let automationCode = JSON.parse(wellnessData.wellness)._id
            setCasemap({
                decision:
                    "sig" + automationCode.trim().charAt(0).toUpperCase() + automationCode.trim().substr(1),
                correlation:
                    "sig" + automationCode.trim().charAt(0).toUpperCase() + automationCode.trim().substr(1),
                updateSnooze: 24,
                snooze: 1,
                runInterval: 1,
                conditionName: ""
            })
            setDecisions(["sigDefault"])
            setCorrelations([])
            setAlertTypes([])

        }
    }, [wellnessData.wellness])


    const dispatch = useDispatch()

    const renderAlertTypeChip = () => {
        return alertTypes.map((element, index) => {
            return <Chip key={index} label={element} onDelete={() => handleDeleteAlerts(element)} color="primary" />
        })
    }

    const renderDecisionChip = () => {
        return decisions.map((element, index) => {
            return <Chip key={index} label={element} onDelete={() => handleDeleteDecisons(element)} color="primary" />
        })
    }

    const renderCorrelationChip = () => {
        return correlations.map((element, index) => {
            return <Chip key={index} label={element} onDelete={() => handleDeleteCorrelations(element)} color="primary" />
        })
    }

    const handleDeleteAlerts = (element) => {
        setAlertTypes(alertTypes.filter(alertType => alertType !== element))
    };

    const handleDeleteDecisons = (element) => {
        setDecisions(decisions.filter(decsion => decsion !== element))
    };

    const handleDeleteCorrelations = (element) => {
        setCorrelations(correlations.filter(correlation => correlation !== element))
    }

    const submitCasemap = e => {
        e.preventDefault()
        if (decisions.length < 1) {
            setInfoParam({
                info: "Decision Signature cannot be empty",
                variant: "filled",
                severity: "error"
            })
            return
        }
        if (casemap.updateSnooze < 0) {
            setInfoParam({
                info: "Update Throttle is expecting a positive integer value",
                variant: "filled",
                severity: "error"
            })
            return
        }
        if (casemap.snooze < 0) {
            setInfoParam({
                info: "Snooze Period is expecting a positive integer value",
                variant: "filled",
                severity: "error"
            })
            return
        }
        if (casemap.runInterval < 0) {
            setInfoParam({
                info: "Run Interval is expecting a positive integer value",
                variant: "filled",
                severity: "error"
            })
            return
        }

        setInfoParam({
            info: "Please fill in appropriate details and click Save",
            variant: "outlined",
            severity: "info"
        })
        let intUpdateSnooze = parseInt(casemap.updateSnooze)
        let intSnooze = parseInt(casemap.snooze)
        let intRunInterval = parseInt(casemap.runInterval) * 3600000000000


        setCasemapObj({
            ConditionName: casemap.conditionName ? casemap.conditionName : null,
            Name: template._id ? template._id : "",
            AlertType: alertTypes,
            Version: 0,
            Enabled: true,
            UpdateSnooze: intUpdateSnooze > 0 ? intUpdateSnooze : null,
            Snooze: intSnooze > 0 ? intSnooze : null,
            RunInterval: intRunInterval > 0 ? intRunInterval : null,
            SignaturesToRun: (decisions.length > 0) ? decisions : "sigDefault",
            CorrelationSignaturesToRun: correlations,
        })
        dispatch(openModal({
            toShow: "Casemap Template"
        }))
    }

    const integerCheck = RegExp(/\.|-|\+/)
    const signatureNameCheck = RegExp(/^$|^sig.+/)

    return (
        <form className={classes.root} autoComplete="off" onSubmit={submitCasemap}>
            <SimpleInfo info={infoParam.info} variant={infoParam.variant} severity={infoParam.severity} />
            <div className={classes.chipElements}>
                <TextField id="AlertType" label="AlertType" type="Number"
                    placeholder="Mention Alert-IDs"
                    onChange={(event) => setCasemap({ ...casemap, alertType: event.target.value })}
                    error={
                        integerCheck.test(casemap.alertType)
                    }
                    helperText={integerCheck.test(casemap.alertType) ? "Can accept only positive integers" : "Click (+) to add alert"}
                />

                <Fab color="primary" aria-label="add" className={classes.addButton}
                    onClick={
                        () => {
                            if (casemap.alertType > 1) {
                                setAlertTypes([...alertTypes, parseInt(casemap.alertType)])
                            }
                        }
                    }>
                    <AddIcon />
                </Fab>
                <div className={classes.chipRoot}>
                    {renderAlertTypeChip()}
                </div>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px',
            }}>
                <TextField id="conditionname" label="Wellness Dashboard Condition Name" type="search" variant="standard"
                    placeholder="optional"
                    style={{
                        width: '49pc'
                    }}
                    onChange={(event) => setCasemap({ ...casemap, conditionName: event.target.value })}
                    value={
                        casemap.conditionName || ''
                    }
                />
            </div >

            <div style={{
                display: 'flex',
                paddingLeft: '8px'
            }}>

                <TextField id="snooze" label="Snooze Period(Days)" type="Number" variant="standard"
                    placeholder="1"
                    style={{
                        width: '24pc',
                    }}
                    onChange={(event) => setCasemap({ ...casemap, snooze: event.target.value })}
                    error={integerCheck.test(casemap.snooze)}
                    helperText={integerCheck.test(casemap.snooze) ? "Can accept only positive integers" : ""}
                    value={casemap.snooze || ''}
                />
                <TextField id="UpdateSnooze" label="Update Throttle(Hours)" type="Number" variant="standard"
                    placeholder="24"
                    style={{
                        width: '24pc',
                        marginRight: '1pc',
                    }}
                    onChange={(event) => setCasemap({ ...casemap, updateSnooze: event.target.value })}
                    error={integerCheck.test(casemap.updateSnooze)}
                    helperText={integerCheck.test(casemap.updateSnooze) ? "Can accept only positive integers" : ""}
                    value={casemap.updateSnooze || ''}
                />


                <TextField id="RunInterval" label="Run Interval(Hours)" type="Number" variant="standard"
                    placeholder="1"
                    style={{
                        width: '24pc'
                    }}
                    onChange={(event) => setCasemap({ ...casemap, runInterval: event.target.value })}
                    error={integerCheck.test(casemap.runInterval)}
                    helperText={integerCheck.test(casemap.runInterval) ? "Can accept only positive integers" : ""}
                    value={casemap.runInterval || ''}
                />

            </div>

            <div className={classes.chipElements}>
                <TextField id="Decision" label="Decision Signature" type="default text"
                    placeholder="sigAutomationcode"
                    onChange={
                        (event) => setCasemap({ ...casemap, decision: event.target.value })
                    }
                    helperText={(signatureNameCheck).test(casemap.decision) ? "Click (+) to add decision signature" : "use format sig{AutomationCode}"}
                    value={casemap.decision || ''}

                />
                <Fab color="primary" aria-label="add" className={classes.addButton}
                    onClick={
                        () => {
                            if ((casemap.decision).length > 3) {
                                setDecisions([...decisions, casemap.decision])
                            }
                        }
                    }>
                    <AddIcon />
                </Fab>
                {(decisions.length < 1) ?
                    <div style={{
                        width: '25vw',
                        display: 'flex',
                        marginLeft: '20px',
                        marginTop: '0px'
                    }}>
                        <SimpleInfo info={<p>Decision Signature cannot be empty<br></br>Use sigDefault if no signature is needed</p>} variant="standard" severity="warning"
                        />
                    </div>
                    :
                    <div className={classes.chipRoot}>
                        {renderDecisionChip()}

                    </div>}

            </div>

            <div className={classes.chipElements}>
                <TextField id="Correlation" label="Correlation Signature" type="search"
                    placeholder="sigAutomationcode"
                    onChange={(event) => setCasemap({ ...casemap, correlation: event.target.value })}
                    helperText={(signatureNameCheck).test(casemap.correlation) ? "Click (+) to add correlation signature" : "use format sig{AutomationCode}"}
                    value={casemap.correlation || ''}
                />
                <Fab color="primary" aria-label="add" size="small" className={classes.addButton}
                    onClick={
                        () => {
                            if ((casemap.correlation).length > 3) {
                                setCorrelations([...correlations, casemap.correlation])
                            }
                        }
                    }>
                    <AddIcon />
                </Fab>
                <div className={classes.chipRoot}>
                    {renderCorrelationChip()}
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px'
            }}>
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{
                        width: '200px',
                        height: '45px'
                    }}
                    className={classes.button}
                >
                    Preview Input
                </Button>
                <PreviewPanel jsonData={casemapObj} />
                <div style={{
                    display: 'flex',
                    width: '43%',
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            width: '100px',
                            height: '45px',
                            borderRadius: '25px'
                        }}
                        className={classes.button}
                        onClick={() => loadSaved ? setLoadSaved(false) : setLoadSaved(true)}
                    >
                        load
                        <SaveIcon style={{
                            marginLeft: '5px'
                        }} />
                    </Button>
                    <PreviewPanel jsonData={casemapObj} />
                </div>

            </div>
        </form>

    );
}
export default CasemapFields;
