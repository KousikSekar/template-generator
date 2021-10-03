import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CasemapContainer from './casemap/PageContainer';
import WellnessContainer from './wellness/wellnessContainer';
import CAndHContainer from './correlationAndHealthcheck/CAndHContainer';
import AlertSnack from '../common/AlertSnack';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/preview/action';
import { closeAlert } from '../store/alert/action';
import LogsContainer from './automationLogs/LogsContainer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        height: '100%',
        alignContent: 'center'
    },
}));

function getSteps() {
    return ['Wellness Template', 'Casemap', 'Correlations and Healthcheck', 'Automation Logs'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <WellnessContainer />
        case 1:
            return <CasemapContainer />;
        case 2:
            return <CAndHContainer />;
        case 3:
            return <LogsContainer />
        default:
            return 'Unknown step';
    }
}

const HorizontalLinearStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const steps = getSteps();
    const nextState = useSelector((state) => state.nextReducer)

    const handleNext = () => {
        dispatch(closeModal())
        dispatch(closeAlert())
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '100px',
                            alignItems: 'center'
                        }}>
                            <Typography className={classes.instructions}>
                                Thank you for using this application You may close the window
                            </Typography>
                        </div>

                    </div>

                ) : (

                    <div>
                        {getStepContent(activeStep)}
                        <div>
                            <Container fixed style={{
                                marginBottom: '20px'
                            }}>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}
                                    variant="contained"
                                    color="primary">
                                    Back
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                    disabled={
                                        (activeStep === 0) ? nextState.disableWellnessNext :
                                            (activeStep === 1) ? nextState.disableCasemapNext :
                                                nextState.disableCandhNext
                                    }
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Container>
                        </div>
                    </div>
                )}
            </div>
            <AlertSnack />
        </div>
    );
}
export default HorizontalLinearStepper;
