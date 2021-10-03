import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/preview/action';
import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { addWellness } from '../store/wellness/action';
import { addCasemap } from '../store/casemap/action';
import SimpleInfo from './InfoBox';
import CloseIcon from '@material-ui/icons/Close';
import { triggerAlert, closeAlert } from '../store/alert/action';
import { addCorrelationAndHealthchecks } from '../store/correlationsAndHealthchecks/action';
import { enableNextForWellness, enableNextForCasemap } from '../store/Next/action';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: 'white',
        padding: theme.spacing(2, 4, 3),
        height: '550px',
        width: '1000px',
    },
    scroller: {
        height: '450px',
        overflowY: 'auto',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    titleAlign: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    }
}));

const PreviewPanel = (props) => {
    const classes = useStyles();
    const preview = useSelector((state) => state.previewReducer)
    const dispatch = useDispatch()


    const handleClose = () => {
        dispatch(closeModal())
        dispatch(closeAlert())
    };

    const display = () => {
        let toShow = {}
        if (preview.component === "Casemap Template") {
            toShow = props.jsonData ? props.jsonData : {}
        } else if (preview.component === "Wellness Template") {
            toShow = JSON.parse(props.jsonData ? props.jsonData : "{}")
        } else if (preview.component === "Correlations and HealthChecks Template") {
            toShow = props.jsonData ? props.jsonData : {}
        }
        return <ReactJson src={toShow} displayDataTypes={false} collapsed={false} enableClipboard={false} indentWidth={2}
            style={{
                marginLeft: '60px',
                fontSize: '15px',
                fontWeight: 'bold',
            }} />
    }

    const handleSave = e => {
        e.preventDefault()

        if (preview.component === "Wellness Template") {
            let template = JSON.parse(props.jsonData)
            if (template._id) {
                dispatch(addWellness(props.jsonData))
                dispatch(triggerAlert({
                    message: 'Template successfully saved',
                    severity: 'success',
                    isVisible: true
                }))
                dispatch(enableNextForWellness())
            } else {
                dispatch(triggerAlert({
                    message: "Template not saved due to missing field '_id':'automationcode'",
                    severity: 'warning',
                    isVisible: true
                }))
            }
        } else if (preview.component === "Casemap Template") {
            dispatch(addCasemap(props.jsonData))
            dispatch(triggerAlert({
                message: 'Template successfully saved',
                severity: 'success',
                isVisible: true
            }))
            dispatch(enableNextForCasemap())
        } else if (preview.component === "Correlations and HealthChecks Template") {
            dispatch(addCorrelationAndHealthchecks(props.jsonData))
            dispatch(triggerAlert({
                message: 'Data successfully saved',
                severity: 'success',
                isVisible: true
            }))

        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={preview.show}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={preview.show}>
                    <div className={classes.paper}>
                        <div className={classes.titleAlign}>
                            <h2 id="transition-modal-title">{preview.component}</h2>
                            {preview.callFromGetExisting ?
                                <SimpleInfo info="The below data is saved" variant="outlined" severity="info" /> :
                                <></>}
                            <div style={{
                                alignItems: 'flex-start'
                            }}>
                                {preview.callFromGetExisting ? <></> :
                                    <Button variant="contained" color="primary" type="Submit"
                                        startIcon={<SaveIcon />}
                                        disabled={preview.callFromGetExisting}
                                        onClick={handleSave}
                                        style={{
                                            height: '45px'
                                        }}
                                    >
                                        Save Template
                                    </Button>
                                }
                                <Button color="primary"
                                    style={{
                                        height: '45px',
                                    }}
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </Button>
                            </div>

                        </div >
                        <hr></hr>
                        <div id="transition-modal-description" className={classes.scroller}>
                            {display()}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default PreviewPanel;