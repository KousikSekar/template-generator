import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CasemapFields from './FormComponents';
import GetExistingCollection from './GetExistingCollection';
import { useDispatch } from 'react-redux';
import { closeAlert } from '../../store/alert/action';

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
    switchText: {

    }
});

const GreenSwitch = withStyles({
    switchBase: {
        color: 'default',
        '&$checked': {
            color: '#51F737',
        },
        '&$checked + $track': {
            backgroundColor: '#51F737',
        },
    },
    checked: {},
    track: {},
})(Switch);

const CasemapCard = () => {
    const classes = useStyles();
    const [existing, setExisting] = useState(false);
    const dispatch = useDispatch()

    const toggleChecked = () => {
        setExisting((prev) => !prev);
        dispatch(closeAlert())
    };

    return (
        <Card className={classes.root}>
            <div className={classes.headingRow}>
                <Typography component={'span'} className={classes.headingRow} variant={'body2'}>
                    Casemap
                </Typography>
                < FormControlLabel
                    value="start"
                    label="Query Existing Collection"
                    labelPlacement="start"
                    control={<GreenSwitch checked={existing} onChange={toggleChecked} name="checkedA" />}
                />
            </div>
            {
                existing ? <GetExistingCollection /> : <CasemapFields />
            }
        </Card>
    );
}
export default CasemapCard;


