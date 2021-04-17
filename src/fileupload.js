import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
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
    buttonError: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
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
    const [error, setError] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogContent, setDialogContent] = React.useState("");
    const el = React.useRef(); // accesing input element

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error,
    });

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
        setDialogTitle("");
        setDialogContent("");
    }

    const uploadFile = (file) => {
        console.log(file)
        if (file.name.split(".")[1] !== "ino") {
            setDialogOpen(true);
            setDialogTitle("Unzulässiger Dateityp");
            setDialogContent("Die übergebene Datei entsprach nicht dem geforderten Format. Es sind nur INO-Dateien zulässig.");
        } else {
            setSuccess(false);
            setLoading(true);
            if (file.name.split(".")[0] == "") {
                setDialogOpen(true);
                setDialogTitle("Kein Dateinamen");
                setDialogContent("Bitte geben sie der Datei vor dem Hochladen einen Namen.");
            } else {
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onloadend = () => {
                    console.log(reader.result)
                    axios.post("${process.env.BACKEND_URL}/api/queue", {
                        sketch: reader.result.toString(),
                        sketch_name: file.name.split(".")[0]
                    }, { headers: { 'deviceID': localStorage.getItem("deviceID") } })
                        .then((response) => {
                            if (response.status == 200) {
                                setLoading(false);
                                setSuccess(true);
                                setTimeout(function () {
                                    setSuccess(false);
                                }, 5000);
                            } else {
                                setLoading(false);
                                setError(true);
                                setTimeout(function () {
                                    setError(false);
                                }, 5000);
                            }
                        }).catch((error) => {
                            setLoading(false);
                            setError(true);
                            setTimeout(function () {
                                setError(false);
                            }, 5000);
                        })
                };
            }
        }
    }

    return (
        <div>
            <div ref={el} style={{ width: 'max-content', height: '40px', marginRight: '5px' }}>
                <input type="file" ref={el} onChange={(e) => uploadFile(e.target.files[0])} accept=".ino" style={{ display: 'none' }} id="upload-sketch" />
                <label htmlFor="upload-sketch" className={classes.wrapper}>
                    <Tooltip title="Lade deinen Sketch hoch" arrow>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            component="span"
                            startIcon={success ? <CheckIcon /> : error ? <CloseIcon /> : <SaveIcon />}
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
