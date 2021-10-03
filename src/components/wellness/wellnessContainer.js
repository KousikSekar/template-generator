import React from 'react';
import Container from '@material-ui/core/Container';
import WellnessCard from './wellnessCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    containerAlignment: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));

const WellnessContainer = () => {
    const classes = useStyles();
    return (
        <>
            <Container fixed className={classes.containerAlignment}>
                <WellnessCard />
            </Container>
        </>
    );
}
export default WellnessContainer;