import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { Tooltip } from '@material-ui/core';
import Dialog from './components/Dialog';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function FileUpload() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogContent, setDialogContent] = React.useState("");
    const el = React.useRef(); // accesing input element

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
        setDialogTitle("");
        setDialogContent("");
    }

    const uploadFile = (file) => {
        // if (file.type !== "text/x-arduino" && file.type !== "text/xml") {
        //     setDialogOpen(true);
        //     setDialogTitle("Unzulässiger Dateityp");
        //     setDialogContent("Die übergebene Datei entsprach nicht dem geforderten Format. Es sind nur XML- und INO-Dateien zulässig.");
        // } else {
        setSuccess(false);
        setLoading(true);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = () => {
            console.log(reader.result)
            fetch(window.location.origin + "/api/upload", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'appliacation/json',
                    'deviceID': localStorage.getItem("deviceID").toString()
                },
                body: JSON.stringify({ sketch: "reader.result" })
            }).then((response) => {
                if (response.ok) {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(function () {
                        setSuccess(false); 0
                    }, 5000);
                }
            }).catch((error) => { console.log(error) });
        };
        // }
    }

    return (
        <div>
            <div ref={el} style={{ width: 'max-content', height: '40px', marginRight: '5px' }}>
                <input type="file" ref={el} onChange={(e) => uploadFile(e.target.files[0])} accept="text/x-arduino, text/xml" style={{ display: 'none' }} id="upload-sketch" />
                <label htmlFor="upload-sketch" className={classes.wrapper}>
                    <Tooltip title="Lade deinen Sketch hoch" arrow>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            component="span"
                            startIcon={success ? <CheckIcon /> : <SaveIcon />}
                        >
                            Hochladen
                    </Button>
                    </Tooltip>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </label>
            </div>
            <Dialog
                open={dialogOpen}
                title={dialogTitle}
                content={dialogContent}
                onClose={toggleDialog}
                onClick={toggleDialog}
            />
        </div>
    );
}

export default FileUpload;
