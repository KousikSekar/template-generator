import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CAndHFields from './CAndHFormComponent';


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

const CAndHCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.headingRow}>
                <Typography component={'span'} className={classes.headingRow} variant={'body2'}>
                    Correlations And HealthChecks
                </Typography>
            </div>
            <CAndHFields />
        </Card>
    );
}
export default CAndHCard;


