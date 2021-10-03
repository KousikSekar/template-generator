import React from 'react';
import Container from '@material-ui/core/Container';
import CasemapCard from './CasemapCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    containerAlignment: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));

const CasemapContainer = () => {
    const classes = useStyles();
    return (
        <>
            <Container fixed className={classes.containerAlignment}>
                <CasemapCard />
            </Container>
        </>
    );
}
export default CasemapContainer;