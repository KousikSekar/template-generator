import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openForGetExisting } from '../../store/preview/action';
import { deepPurple } from '@material-ui/core/colors';
import PreviewPanel from '../../common/Preview';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const FinalPreview = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const wellnessData = useSelector((state) => state.wellnessReducer)
    const casemapData = useSelector((state) => state.casemapReducer)
    const candhData = useSelector((state) => state.correlationAndHealthChecksReducer)
    const [page, setPage] = useState(0)
    const [jsonDatas, setJsonDatas] = useState({})


    useEffect(
        () => {
            switch (page) {
                case 1:
                    setJsonDatas(wellnessData.wellness)
                    dispatch(openForGetExisting({
                        toShow: "Wellness Template"
                    }))
                    break;
                case 2:
                    setJsonDatas(casemapData)
                    dispatch(openForGetExisting({
                        toShow: "Casemap Template"
                    }))
                    break;
                case 3:
                    setJsonDatas(candhData)
                    dispatch(openForGetExisting({
                        toShow: "Correlations and HealthChecks Template"
                    }))
                    break;
                default:
                    break;
            }
            return (() => setPage(0))
            // eslint-disable-next-line
        }, [page]
    )


    return (
        <List className={classes.root}>
            <ListItem>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: 'large',

                    }}>
                        You can preview the saved details here :
                    </div>
                    <Button color="default" variant="contained"
                        onClick={() => { setPage(1) }}
                        style={{
                            marginLeft: '10px',
                            borderRadius: '30px',
                            backgroundColor: '#757de8',
                            color: 'white'
                        }}
                    >
                        Wellness
                    </Button>
                    <Button color="default" variant="contained"
                        onClick={() => { setPage(2) }}
                        style={{
                            borderRadius: '30px',
                            backgroundColor: '#757de8',
                            color: 'white',
                            marginLeft: '5px'
                        }}
                    >
                        Casemap
                    </Button>
                    <Button color="default" variant="contained"
                        onClick={() => { setPage(3) }}
                        style={{
                            borderRadius: '30px',
                            backgroundColor: '#757de8',
                            color: 'white',
                            marginLeft: '5px'

                        }}
                    >
                        Correlations and Healthchecks
                    </Button>
                    <PreviewPanel jsonData={jsonDatas} />
                </div>
            </ListItem>

        </List>
    );
}
export default FinalPreview;
