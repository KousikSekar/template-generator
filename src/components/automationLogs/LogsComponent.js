import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Chip } from '@material-ui/core';
import SimpleInfo from '../../common/InfoBox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: '0px',
        paddingBottom: '0px'

    },
    listItempadding: {
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    timestamp: {
        fontWeight: '700',
        fontSize: '14px',
        background: '#C6F0FD',
        color: '#0202B0',
        width: '180px',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        borderColor: '#0202B0',
        borderStyle: 'solid',
        borderWidth: '1px'
    },
    wrongLog: {
        marginLeft: '100px',
        fontSize: '16px',
        fontWeight: '500',
        color: 'red'
    },
    greenChip: {
        background: "green",
        color: 'white',
        width: '90px',
        display: 'flex',
        justifyContent: 'center'
    },
    redChip: {
        background: "red",
        color: 'white',
        width: '90px',
        display: 'flex',
        justifyContent: 'center'
    },
    yellowChip: {
        background: "#A69603",
        color: 'white',
        width: '90px',
        display: 'flex',
        justifyContent: 'center'
    }
}));

const FolderList = (props) => {
    const classes = useStyles();

    const logValue = (line) => {
        let data = line.split(':')
        return data.slice(4)
    }

    const timeStamp = (line) => {
        let data = line.split(":")
        return data[0] + ":" + data[1] + ":" + data[2]
    }

    const generateChip = (line) => {
        let data = line.split(':')
        switch (data[3].trim()) {
            case "INFO":
                return (<Chip label="INFO" className={classes.greenChip} />)

            case "ERROR":
                return <Chip label="ERROR" className={classes.redChip} />

            case "WARNING":
                return <Chip label="WARNING" className={classes.yellowChip} />
            default:
                return (<Chip label="INFO" className={classes.greenChip} />)
        }
    }

    if (props.payload === "error") {
        return <SimpleInfo info={<p>There was an error running the automation<br></br>{props.error}</p>} variant="filled" severity="error" />
    } else {
        console.log(props.payload)
        return props.payload.map((line, index) => {
            return (
                < List dense className={classes.root} key={index} >
                    {(line.split(':').length > 4) ?
                        (
                            <div>
                                <ListItem dense className={classes.listItempadding} key={index}>
                                    <div>
                                        {generateChip(line)}
                                    </div>

                                    <div style={{
                                        marginLeft: '10px',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}>
                                        {logValue(line)}
                                        <div className={classes.timestamp}>
                                            {timeStamp(line)}
                                        </div>
                                    </div>
                                </ListItem>
                                <hr style={{ opacity: '0.4' }}
                                ></hr>
                            </div>
                        ) : <></>}
                </List >
            )
        });
    }

}
export default FolderList;
