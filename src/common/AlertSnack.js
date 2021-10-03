import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../store/alert/action';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AlertSnack = () => {
    const alertData = useSelector((state) => state.alertReducer)
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeAlert());
    };

    return (
        <div className={classes.root}>
            <Snackbar open={alertData.isVisible} autoHideDuration={null} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertData.severity}>
                    {alertData.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertSnack;