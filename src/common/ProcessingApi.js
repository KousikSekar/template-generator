import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const CircularLoading = () => {
    const showData = useSelector((state) => state.loadingReducer);
    const classes = useStyles();

    return (
        <div className={classes.root}>

            {
                showData.show ?
                    <CircularProgress
                        style={{ marginLeft: '10px' }}
                        variant="indeterminate"
                        size={30}
                        thickness={4}
                        value={100} /> : <> </>
            }
        </div>
    );
}
export default CircularLoading;