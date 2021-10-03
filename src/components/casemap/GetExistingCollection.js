import { React, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getExistingCasemap } from '../../store/casemap/action';
import CircularLoading from '../../common/ProcessingApi';
import SimpleInfo from '../../common/InfoBox';
import { openForGetExisting } from '../../store/preview/action';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PreviewPanel from '../../common/Preview';

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

const GetExistingCollection = () => {
    const classes = useStyles();
    const [using, setUsing] = useState('AlertType');
    const [queryValue, setQueryValue] = useState('');
    const buttonState = useSelector((state) => state.buttonReducer);
    const dispatch = useDispatch();
    const casemapFromStore = useSelector((state) => state.casemapReducer);

    const [jsonDatas, setJsonDatas] = useState({});

    const handleChange = (event) => {
        setUsing(event.target.value)
    };

    useEffect(() => {
        setJsonDatas(casemapFromStore)
    }, [casemapFromStore])

    const callApi = e => {
        e.preventDefault()
        let queryObj = ({
            AlertType: 0,
            AutomationCode: ""
        })
        using === 'AlertType' ? queryObj.AlertType = parseInt(queryValue) : queryObj.AutomationCode = queryValue
        if (isNaN(queryObj.AlertType))
            queryObj.AlertType = null
        dispatch(getExistingCasemap(queryObj))
    }

    const integerCheck = RegExp(/^[0-9]+$|^$/)

    return (
        <form className={classes.root} autoComplete="off">
            <SimpleInfo info="Select and mention either the Automation Code or Alert Type for which Casemap needs to be obtained" variant="outlined" severity="info" />
            <div style={{
                display: 'flex',
                padding: '20px'
            }}>
                <Select
                    value={using}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <MenuItem value={'AlertType'}>Alert ID</MenuItem>
                    <MenuItem value={'AutomationCode'}>Automation Code</MenuItem>
                </Select>
                <TextField id="name" label="value" variant="standard"
                    placeholder=""
                    style={{
                        width: '20pc'
                    }}
                    onChange={((event) => setQueryValue(event.target.value))}
                    error={(using === 'AlertType') ? (integerCheck.test(queryValue) ? false : true) : false}
                    type={(using === 'AlertType') ? "Number" : "Default Text"}
                    helperText={(using === 'AlertType') ? (integerCheck.test(queryValue) ? "" : "please provide +ve integer values") : ""}
                />

            </div >
            <div style={{
                display: 'flex',
                padding: '20px',
                alignItems: 'center'
            }}>
                <Button variant="contained" color="primary" type="Submit"
                    onClick={(event) => callApi(event)}
                >
                    <FindInPageIcon style={{
                        marginRight: '3px'
                    }} />
                    Casemap
                </Button>
                <Button variant="contained" color="primary"
                    disabled={buttonState.disableCasemap}
                    onClick={() => dispatch(openForGetExisting({
                        toShow: "Casemap Template"
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
    );
}
export default GetExistingCollection;


