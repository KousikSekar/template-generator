import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import SimpleInfo from '../../common/InfoBox';
import PreviewPanel from '../../common/Preview';
import { openModal } from '../../store/preview/action';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    chipElements: {
        paddingLeft: '15px',
        display: 'flex',
        alignItems: 'center',
    },
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [wellness, setWellness] = useState("{}")
    const dispatch = useDispatch()


    const isValidJson = (data) => {
        try {
            JSON.parse(data)
        }
        catch (err) {
            return false
        }
        return true
    }

    return (

        <form className={classes.root} >
            <SimpleInfo info={<p>Please make a JSON template below<br />Preview will be enabled if the template is valid</p>} variant="outlined" severity="info" />
            <PreviewPanel />
            <div className={classes.chipElements}>
                <TextField
                    id="wellnessinput"
                    label="Value"
                    multiline
                    placeholder="Please copy or frame the template here"
                    variant="standard"
                    onChange={(event) => setWellness(event.target.value)}
                    style={{
                        width: '75pc'
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                padding: '15px'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(openModal({
                        toShow: "Wellness Template"
                    }))}
                    className={classes.button}
                >
                    Preview Input
                </Button>
                <PreviewPanel jsonData={isValidJson(wellness) ? wellness : "{}"} />
            </div>
        </form>
    );
}
