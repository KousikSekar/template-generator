import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CAndHCard from './CAndHCard';

const useStyles = makeStyles((theme) => ({
    containerAlignment: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));

const CAndHContainer = () => {
    const classes = useStyles();
    return (
        <>
            <Container fixed className={classes.containerAlignment}>
                <CAndHCard />
            </Container>
        </>
    );
}
export default CAndHContainer;