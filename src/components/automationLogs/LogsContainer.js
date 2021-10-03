import React from 'react';
import Container from '@material-ui/core/Container';
import LogsCard from './LogsCard';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    containerAlignment: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));

const LogsContainer = () => {
    const classes = useStyles();
    return (
        <>
            <Container fixed className={classes.containerAlignment}>
                <LogsCard />
            </Container>
        </>
    );
}
export default LogsContainer;