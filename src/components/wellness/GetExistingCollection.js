import { React, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getExistingWellness } from '../../store/wellness/action';
import CircularLoading from '../../common/ProcessingApi';
import SimpleInfo from '../../common/InfoBox';
import PreviewPanel from '../../common/Preview';
import { openForGetExisting } from '../../store/preview/action';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    fieldElements: {
        display: 'flex',
        padding: '8px',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "Helvetica",
        paddingTop: '23px',
    }
}));

const GetExistingWellness = () => {
    const classes = useStyles();
    const [queryValue, setQueryValue] = useState('');
    const wellnessFromStore = useSelector((state) => state.wellnessReducer);
    const buttonState = useSelector((state) => state.buttonReducer);
    const [jsonDatas, setJsonDatas] = useState("{}")
    const dispatch = useDispatch()


    useEffect(() => {
        setJsonDatas(wellnessFromStore.wellness)
    }, [wellnessFromStore.wellness])

    const callApi = (e) => {
        e.preventDefault()
        let queryObj = {
            "automationcode": queryValue
        }
        dispatch(getExistingWellness(queryObj))
    }

    return (
        <>
            <form className={classes.root} autoComplete="off">
                <SimpleInfo info="Mention the Automation Code for which template needs to be obtained"
                    variant="outlined" severity="info" />
                <div style={{
                    display: 'flex',
                    padding: '20px'
                }}>
                    <TextField id="name" variant="standard"
                        placeholder=""
                        label="Automation Code"
                        style={{
                            width: '40pc'
                        }}
                        onChange={((event) => setQueryValue(event.target.value))}
                        type="Default Text"
                    />
                </div >
                <div style={{
                    display: 'flex',
                    padding: '20px'
                }}>
                    <Button variant="contained" color="primary" type="Submit"
                        onClick={(event) => callApi(event)}
                    >
                        <FindInPageIcon style={{
                            marginRight: '3px'
                        }} />
                        Wellness
                    </Button>
                    <Button variant="contained" color="primary"
                        disabled={buttonState.disableWellness}
                        onClick={() => dispatch(openForGetExisting({
                            toShow: "Wellness Template"
                        }))}
                        style={{
                            marginLeft: '10px'
                        }}
                    >
                        Preview
                    </Button>
                    <CircularLoading />
                    <PreviewPanel jsonData={jsonDatas} />
                </div>
            </form>
        </>
    );
}
export default GetExistingWellness;


