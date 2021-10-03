import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    outerStyle: {
        // background: "#757de8",
        margin: 'auto',
        width: 'fit-content',
        justifyContent: 'center',
        marginTop: '12px',
        marginBottom: '2px',
        padding: '1px',
        borderRadius: '5px'
    },
    innerStyle: {
        borderRadius: '4px',
        paddingTop: '0px',
        paddingBottom: '0px',
        alignItems: 'center'
    }
}));

const SimpleInfo = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.outerStyle}>
            <Alert severity={props.severity} variant={props.variant}
                className={classes.innerStyle}
            >
                {props.info}</Alert>
        </div >
    );
}

export default SimpleInfo;
