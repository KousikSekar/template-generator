import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center',
    },
}));

const LoadingLogs = () => {
    const classes = useStyles();

    return (
        <div style={{
            height: '340px'
        }}>
            <div className={classes.root}>
                <div style={{
                    fontSize: '22px',
                    fontWeight: '500',
                    margin: '20px'
                }}>
                    Please wait for the automation to complete. This might take few minutes
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '60px'

            }}>
                <CircularProgress
                    style={{ marginLeft: '10px' }}
                    variant="indeterminate"
                    size={90}
                    thickness={2}
                    value={100} />
            </div>
        </div>


    );
}
export default LoadingLogs;