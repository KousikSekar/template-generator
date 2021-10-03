import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FolderList from './LogsComponent';
import FinalPreview from './LogPreview';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { useSelector } from 'react-redux';
import { runAutomation, runTestCase } from '../../api';
import LoadingLogs from './ProcessingAutomation';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        backgroundColor: '#3f51b5',

    },
    getExistingSwitch: {
        marginBottom: 12,
    },
    headingRow: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#757de8',
        color: 'white',
        padding: '8px',
        fontSize: '1.3rem',
        fontWeight: '400',
        fontFamily: "Helvetica",
    },
    buttonOkay: {
        width: '80px',
        height: '40px',
        borderRadius: '5px',
    },
    buttonRetry: {
        width: '80px',
        height: '40px',
        borderRadius: '5px',
        marginLeft: '20px'
    },
    launchBg: {
        background: '#c8ccff',
        borderRadius: '30px',
        paddingTop: '50px',
        paddingBottom: '50px'
    },
    launchText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 'large',
        marginBottom: '20px',
        borderRadius: '15px'
    },
    launchAlign: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    launchButton: {
        width: '250px',
        height: '45px',
        marginLeft: '10px',
        borderRadius: '25px',
    }


});

const LogsCard = () => {
    const classes = useStyles()
    const [launch, setLaunch] = useState(false)
    const wellnessData = useSelector((state) => state.wellnessReducer)
    const casemapData = useSelector((state) => state.casemapReducer)
    const candh = useSelector((state) => state.correlationAndHealthChecksReducer)
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [errors, setErrors] = useState("")
    const [runTest, setRunTest] = useState(false)
    const [requestBody, SetRequestBody] = useState(
        {
            "casemap": {},
            "template": {},
            "query": "",
            "database": "",
            "correlate_casetype": []
        }
    )

    const [testRequestBody, setTestRequestBody] = useState(
        {
            "automationcode":""
        }
    )

    useEffect(() => {
        SetRequestBody({
            ...requestBody,
            "casemap": casemapData,
            "template": JSON.parse(wellnessData.wellness),
            "query": candh.Query,
            "database": candh.Database !== "" ? candh.Database : "Vertica",
            "correlate_casetype": candh.CorrelatedCases
        })
        // eslint-disable-next-line
    }, [casemapData, wellnessData.wellness, candh])

    useEffect(() => {
        setTestRequestBody({
            ...testRequestBody,
            "automationcode": JSON.parse(wellnessData.wellness)._id
        })
        // eslint-disable-next-line
    },[wellnessData.wellness])

    const callAutomationApi = async () => {
        setErrors("")
        setLaunch(true)
        setIsLoading(true)
        try {      
            const response = await runAutomation(requestBody)
            if (response.status === 200) {
                let logData = response.data.log;
                if (logData !== null) {
                    setLogs(logData)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            } else {
                setLogs("error")
                setErrors(String(response))
                setIsLoading(false)
                // setRunTest(false)
            }
        } catch (error) {
            setErrors(String(error))
            setLogs("error")
            setIsLoading(false)
            // setRunTest(false)
        }
    }

    const callTestApi = async () => {
        setRunTest(true)
        setErrors("")
        setLaunch(true)
        setIsLoading(true)
        try {      
            const response = await runTestCase(testRequestBody)
            if (response.status === 200) {
                let logData = response.data.log;
                if (logData !== null) {
                    setLogs(logData)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            } else {
                setLogs("error")
                setErrors(String(response))
                setIsLoading(false)
                // setRunTest(false)
            }
        } catch (error) {
            setErrors(String(error))
            setLogs("error")
            setIsLoading(false)
            // setRunTest(false)
        }
                
    }

    return (
        <Card className={classes.root}>

            <div className={classes.headingRow}>
                <Typography component={'span'} className={classes.headingRow} variant={'body2'}>
                    Run Automation
                </Typography>
            </div>
            <div style={{
                height: '340px',
                overflowY: 'auto',
                marginTop: '7px',
            }}>
                {launch ? (isLoading ?
                    <LoadingLogs />
                    :
                    <div>
                        <FolderList payload={logs} error={errors} />
                        {(errors === "") ? 
                        // button to execute Test
                        runTest ? 
                        <div style={{
                            display: 'flex',
                                justifyContent: 'center',
                                marginBottom : '20px'
                        }}>
                        <Button
                        style={{
                            width : '180px'
                        }}
                        variant="contained"
                        color="primary"
                        className={classes.buttonRetry}
                        onClick={() => callTestApi()}
                    >
                        Rerun TestCase
                    </Button>
                    </div> :
                        <div style={{
                            display: 'flex',
                                justifyContent: 'center',
                                marginBottom : '20px'
                        }}>
                        <Button
                                    style={{
                                        width : '200px'
                                    }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => callTestApi()}
                                >
                                    Execute TestCase 
                                </Button>
                        </div> 
                        :
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '80px',
                            }}>
                                <Button
                                    variant="contained"

                                    color="primary"
                                    className={classes.buttonOkay}
                                    onClick={() => setLaunch(false)}
                                >
                                    Okay
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonRetry}
                                    onClick={() => callAutomationApi()}
                                >
                                    Retry
                                </Button>
                            </div>}
                    </div>

                ) :
                    <div style={{
                        width: '905px',
                        margin: 'auto',
                        height: '15pc',

                    }}>
                        <FinalPreview />
                        <div className={classes.launchBg}>
                            <div className={classes.launchText}>
                                Click here to run the automation
                            </div>
                            <div className={classes.launchAlign}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={classes.launchButton}
                                    onClick={() => callAutomationApi()}
                                >
                                    <FlightTakeoffIcon style={{ marginRight: '8px' }} />
                                    Launch Automation
                                </Button>
                            </div>
                        </div>
                    </div>}
            </div>
        </Card>
    );
}
export default LogsCard;


