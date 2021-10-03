import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import SimpleInfo from '../../common/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import { addCorrelationAndHealthchecks } from '../../store/correlationsAndHealthchecks/action';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { triggerAlert } from '../../store/alert/action';
import { enableNextForCandh } from '../../store/Next/action';
import { format } from 'sql-formatter';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    heading: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    addButton: {
        width: '35px',
        height: '25px',
    },
    chipElements: {
        paddingLeft: '8px',
        display: 'flex',
        alignItems: 'center',
    },
    chipRoot: {
        width: '60vw',
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    fontInForm: {
        display: 'flex',
        marginLeft: '10px',
        fontSize: '17px',
        fontWeight: '600',
        alignItems: 'center'
    },
    accordionMargin: {
        marginLeft: '10px'
    },
}));

const CAndHFields = () => {
    const classes = useStyles();
    const [correlatedCases, setCorrelatedCases] = useState([])
    const dispatch = useDispatch()
    const casemapData = useSelector((state) => state.casemapReducer)
    const candhData = useSelector((state) => state.correlationAndHealthChecksReducer)
    const [disableHC, setDisableHC] = useState(false)
    const [disableCorrelation, setDisableCorrelation] = useState(false)
    const [disableSave, setDisableSave] = useState(false)
    const [loadSaved, setLoadSaved] = useState(false)
    const [loadCorrelations, setLoadCorrelations] = useState(false)
    const [correlationAndHeathcheck, setCorrelationAndHealthcheck] = useState({
        correlatedCase: "",
        database: "",
        query: ""
    })

    useEffect(() => {
        setCorrelationAndHealthcheck({
            ...correlationAndHeathcheck,
            query: candhData.Query ? format(candhData.Query) : "",
        })
        // eslint-disable-next-line
    }, [loadSaved])

    useEffect(() => {
        if (candhData.CorrelatedCases) {
            setCorrelatedCases(candhData.CorrelatedCases)
        }
        // eslint-disable-next-line
    }, [loadCorrelations])

    const renderCorrelateCasesChip = () => {
        return correlatedCases.map((element, index) => {
            return <Chip key={index} label={element} onDelete={() => handleDeleteCorrelatedCases(element)} color="primary" />
        })
    }

    const handleDeleteCorrelatedCases = (element) => {
        setCorrelatedCases(correlatedCases.filter(correlatedCase => correlatedCase !== element))
    }

    const handleSubmit = e => {
        e.preventDefault()
        let cAndHobj = {
            CorrelatedCases: correlatedCases,
            Database: correlationAndHeathcheck.database === "" ? "Vertica" : correlationAndHeathcheck.database,
            Query: correlationAndHeathcheck.query
        }
        dispatch(addCorrelationAndHealthchecks(cAndHobj))
        dispatch(triggerAlert({
            message: 'Data has been successfully saved',
            severity: 'success',
            isVisible: true
        }))
        dispatch(enableNextForCandh())
    }

    useEffect(
        () => {
            if (casemapData.AlertType) {
                if (casemapData.AlertType.length > 0) {
                    setDisableHC(true)
                } else {
                    setDisableHC(false)
                }
            } else {
                setDisableHC(false)
            }
            if (casemapData.CorrelationSignaturesToRun) {
                if (casemapData.CorrelationSignaturesToRun.length > 0) {
                    setDisableCorrelation(false)
                } else {
                    setDisableCorrelation(true)
                }
            } else {
                setDisableCorrelation(true)
            }
            if (disableHC && disableCorrelation) {
                dispatch(enableNextForCandh())
            }
            // eslint-disable-next-line
        }, [casemapData, disableHC, disableCorrelation]
    )

    useEffect(
        () => {
            if ((correlationAndHeathcheck.correlatedCase.trim().length > 0) || (correlationAndHeathcheck.query.trim().length > 0)) {
                setDisableSave(false)
            } else {
                setDisableSave(true)
            }
        }, [correlationAndHeathcheck]
    )

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit}>
            <SimpleInfo info="Some fields might be disabled based on requirement" variant="outlined" severity="info" />
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Accordion style={{ boxShadow: 'none', background: 'white' }}
                    disabled={disableCorrelation}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            width: '70pc',
                            margin: 'auto',
                            background: '#a8c8ff',
                            borderRadius: '10px',
                            marginBottom: '20px',
                            marginTop: '10px',

                        }}
                    >
                        <Typography className={classes.heading}>Correlations</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionMargin}>
                        <div className={classes.fontInForm}>
                            Mention the cases to be correlated with
                        </div>
                    </AccordionDetails >
                    <AccordionDetails className={classes.accordionMargin}>
                        <div className={classes.chipElements}>
                            <TextField id="Correlatedcases" label="Crosstype Correlations" type="Default Text"
                                placeholder=""
                                onChange={(event) => setCorrelationAndHealthcheck({ ...correlationAndHeathcheck, correlatedCase: event.target.value })}
                                helperText="Click (+) to add"
                                style={{
                                    width: '17pc'
                                }}
                            />

                            <Fab color="primary" aria-label="add" className={classes.addButton}
                                onClick={
                                    () => {
                                        if ((correlationAndHeathcheck.correlatedCase).length > 0) {
                                            (setCorrelatedCases([...correlatedCases, correlationAndHeathcheck.correlatedCase]))
                                        }
                                    }
                                }>
                                <AddIcon />
                            </Fab>
                            <div className={classes.chipRoot}>
                                {renderCorrelateCasesChip()}
                            </div>
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div style={{
                            marginLeft: '20px'
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '100px',
                                    height: '35px',
                                    borderRadius: '25px'
                                }}
                                className={classes.button}
                                onClick={() => loadCorrelations ? setLoadCorrelations(false) : setLoadCorrelations(true)}
                            >
                                load
                                <SaveIcon style={{
                                    marginLeft: '5px'
                                }} />

                            </Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Accordion style={{ boxShadow: 'none', background: 'white' }}
                    disabled={disableHC}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            width: '70pc',
                            margin: 'auto',
                            background: '#a8c8ff',
                            borderRadius: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography className={classes.heading}>HealthChecks</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <div className={classes.fontInForm}>
                            <div>
                                Database  :
                            </div>
                            <div style={{
                                paddingLeft: '10px',
                            }}></div>
                            <Select
                                onChange={(event) => setCorrelationAndHealthcheck({ ...correlationAndHeathcheck, database: event.target.value })}
                                variant="outlined"
                                defaultValue="Vertica"
                                style={{ width: '165px' }}

                            >
                                <MenuItem value={"Vertica"}>Vertica</MenuItem>
                                <MenuItem value={"DataMart"}>DataMart</MenuItem>
                                <MenuItem value={"Postgres"}>Postgres</MenuItem>

                            </Select>
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div className={classes.fontInForm}>
                            Query :
                        </div>
                    </AccordionDetails>
                    <AccordionDetails >
                        <div className={classes.chipElements}>
                            <TextField
                                id="queryinput"
                                label=""
                                multiline
                                placeholder="Please type your query here"
                                variant="standard"
                                onChange={(event) => setCorrelationAndHealthcheck({ ...correlationAndHeathcheck, query: event.target.value })}
                                style={{
                                    width: '63pc'
                                }}
                                value={correlationAndHeathcheck.query || ''}
                            />
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div style={{
                            display: 'flex',
                            // width: '43%',
                            justifyContent: 'flex-end',
                            marginLeft: '10px'
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '100px',
                                    height: '40px',
                                    borderRadius: '25px'
                                }}
                                className={classes.button}
                                onClick={() => loadSaved ? setLoadSaved(false) : setLoadSaved(true)}
                            >
                                Query
                                <SaveIcon style={{
                                    marginLeft: '5px'
                                }} />

                            </Button>
                        </div>
                    </AccordionDetails >
                </Accordion>

            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <Button color="primary" type="Submit" variant="contained"
                    startIcon={<SaveIcon />}
                    style={{
                        width: '200px',
                        height: '45px'
                    }}
                    disabled={disableSave}
                >
                    Save Inputs
                </Button>
            </div>
        </form >

    );
}
export default CAndHFields;
