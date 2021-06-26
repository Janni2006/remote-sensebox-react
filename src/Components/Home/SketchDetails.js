import React, { Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDetails } from '../../actions/sketchDetailsActions';

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { saveAs } from 'file-saver';

import { detectWhitespacesAndReturnReadableResult } from '../../helpers/whitespace';
import socket from '../../helpers/socketConnection';

import Grid from '@material-ui/core/Grid';
import { Card, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';

import LaunchIcon from '@material-ui/icons/Launch';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import { faFileDownload, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Blockly from 'blockly/core';
import Snackbar from '../Snackbar';

import BlocklyWindow from '../Blockly/BlocklyWindow';

class SketchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: null,
            videoHeight: null,
            progress: false,
            open: false,
            title: "",
            content: "",
            snackbar: false,
            type: '',
            message: '',
            serial: '',
        };
        this.video = React.createRef();
    }

    componentDidMount() {
        this.setState({
            videoWidth: this.video.current.offsetHeight,
            videoHeight: this.video.current.offsetWidth * 0.5625
        });
        console.log(this.props.sketchDetail.error_msg);

        socket.on("senseboxSerial", this.updateSerial);
    }

    updateSerial = data => {
        this.setState({ serial: data });
    }

    componentWillUnmount() {
        socket.off("senseboxSerial");
    }

    downloadXmlFile = () => {
        var code = this.props.sketchDetail.code.xml;
        var fileName = detectWhitespacesAndReturnReadableResult(this.props.sketchDetail.name);
        fileName = `${fileName}.xml`
        var blob = new Blob([code], { type: 'text/xml' });
        saveAs(blob, fileName);
    }

    downloadInoFile = () => {
        var code = this.props.sketchDetail.code.sketch;
        var fileName = detectWhitespacesAndReturnReadableResult(this.props.sketchDetail.name);
        fileName = `${fileName}.ino`
        var blob = new Blob([code], { type: 'text/x-arduino' });
        saveAs(blob, fileName);
    }

    copyCode = () => {
        navigator.clipboard.writeText(this.props.sketchDetail.code.sketch);
        this.setState({ snackbar: true, type: 'success', key: Date.now(), message: Blockly.Msg.messages_copy_code });
    }

    render() {
        return (
            <div>
                <Grid container spacing={2} style={{ height: "75px", width: "100%" }}>
                    <Grid item xs={11} md={11}>
                        <Typography>
                            <p style={{ fontSize: "20px", marginLeft: "2vw" }}>{this.props.sketchDetail.name}</p>
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={1} style={{ position: "relative" }}>
                        <div
                            style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <IconButton onClick={this.props.closeDetails} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ padding: "0 2vw" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6}>
                            <Card style={{ height: `${this.state.videoHeight}px`, maxHeight: "40vh" }} ref={this.video}>
                                <iframe
                                    src={this.props.camUrl}
                                    name="cam"
                                    width="100%"
                                    height="100%"
                                    scrolling="no"
                                    frameBorder="0"
                                    webkitallowfullscreen="true"
                                    mozallowfullscreen="true"
                                    allowFullScreen="true"
                                    title="stream"
                                ></iframe>
                            </Card>
                            <Card style={{ padding: "1vh 1vw", height: this.state.videoHeight < 300 ? "12vh" : "6vh", marginTop: "2.5vh", }}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    style={{
                                        height: "6vh"
                                    }}
                                >

                                    <Grid item md={6} lg={this.props.sketchDetail.blockly ? 3 : 6} style={{ position: 'relative' }}>
                                        <Fab
                                            variant="extended"
                                            onClick={() => this.downloadInoFile()}
                                            style={{
                                                position: 'absolute', left: '50%', top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}

                                        >
                                            Arduino
                                        </Fab>
                                        {this.props.sketchDetail.blockly && this.state.videoHeight < 300 ?
                                            <Grid item md={6} lg={3} style={{ position: 'relative' }}>
                                                <Fab
                                                    variant="extended"
                                                    onClick={() => this.downloadXmlFile()}
                                                    style={{
                                                        position: 'absolute', left: '50%', top: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: '0.5vw' }} size="md" />
                                                XML
                                            </Fab>
                                            </Grid>
                                            : null
                                        }
                                    </Grid>
                                    {this.props.sketchDetail.blockly && this.state.videoHeight >= 300 ?
                                        <Grid item md={6} lg={3} style={{ position: 'relative' }}>
                                            <Fab
                                                variant="extended"
                                                onClick={() => this.downloadXmlFile()}
                                                style={{
                                                    position: 'absolute', left: '50%', top: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: '0.5vw' }} size="md" />
                                                XML
                                            </Fab>
                                        </Grid>
                                        : null
                                    }
                                    {this.props.sketchDetail.blockly && this.state.videoHeight >= 300 ?
                                        <Grid item md={6} lg={3} style={{ position: 'relative' }}>
                                            <Tooltip title="Öffne das Programm in der Blockly-Umgebung" arrow>
                                                <Link to={`/blockly/${this.props.sketchDetail.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <Fab
                                                        variant="extended"
                                                        color="primary"
                                                        style={{
                                                            position: 'absolute', left: '50%', top: '50%',
                                                            transform: 'translate(-50%, -50%)'
                                                        }}

                                                    >
                                                        <LaunchIcon style={{ marginRight: "1vw" }} />
                                                        Blockly
                                                    </Fab>
                                                </Link>
                                            </Tooltip>
                                        </Grid>
                                        : null
                                    }
                                    <Grid item md={6} lg={this.props.sketchDetail.blockly ? 3 : 6} style={{ position: 'relative' }}>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            {
                                                this.props.sketchDetail.finisched ? <Grid item style={{ height: "48px", width: "100%" }}>
                                                    <SketchRestart
                                                        title={this.props.sketchDetail.name}
                                                        arduino={this.props.sketchDetail.code.sketch}
                                                        xml={this.props.sketchDetail.code.xml}
                                                        sessionID={this.props.sessionID}
                                                    />
                                                </Grid>
                                                    : null
                                            }

                                            {this.props.sketchDetail.blockly && this.state.videoHeight < 300 ?
                                                <Grid item style={{ height: "48px", wisth: "100%" }}>
                                                        <Tooltip title="Öffne das Programm in der Blockly-Umgebung" arrow>
                                                            <Link to={`/blockly/${this.props.sketchDetail.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                <Fab
                                                                    variant="extended"
                                                                    color="primary"
                                                                    style={{
                                                                        position: 'absolute', left: '50%', top: '50%',
                                                                        transform: 'translate(-50%, -50%)'
                                                                    }}

                                                                >
                                                                    <LaunchIcon style={{ marginRight: "1vw" }} />
                                                        Blockly
                                                    </Fab>
                                                            </Link>
                                                        </Tooltip>
                                                </Grid>
                                                : null
                                            }
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={6} style={{ position: 'relative' }}>
                            <Tooltip title="Arduino Code kopieren" arrow>
                                <IconButton
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        position: 'absolute',
                                        top: -8,
                                        right: 20,
                                        zIndex: 2,
                                        backgroundColor: 'white',
                                        color: 'green',
                                        border: '1px solid #e3e3e3',
                                        '&:hover': {
                                            backgroundColor: 'primary',
                                            color: 'white',
                                            border: '1px solid primary'
                                        }
                                    }}
                                    onClick={() => this.copyCode()}
                                >
                                    <FontAwesomeIcon icon={faCopy} size="xs" />
                                </IconButton>
                            </Tooltip>

                            <Card style={{ height: `calc(${this.state.videoHeight}px + 10.5vh)`, maxHeight: "50.5vh" }}>
                                <Code code={this.props.sketchDetail.code.sketch} />
                                <BlocklyWindow readonly={true} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Card style={{ height: "20vh" }}>
                                {this.props.sketchDetail.error ?
                                    <Code code={this.props.sketchDetail.error_msg} /> :
                                    <Code
                                        code={
                                            this.props.sketchDetail.finished ?
                                                this.props.sketchDetail.serial !== null ?
                                                    this.props.sketchDetail.serial.replace(/\r/g, "\n") : "Es sind keine Daten für die Serielle-Konsole vorhanden." :
                                                this.props.sketchDetail.running ? this.state.serial.replace(/\r/g, "\n") : "Dieser Sketch wurde noch nicht auf die senseBox hochgeladen."
                                        }
                                    />
                                }
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.message}
                    type={this.state.type}
                    key={this.state.key}
                />
            </div>
        )
    }
}

class Code extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    render() {
        return (
            <pre
                className="line-numbers"
                style={{
                    paddingBottom: 0,
                    width: '100%',
                    overflow: 'auto',
                    scrollbarWidth: 'thin',
                    height: '100%',
                    margin: '0',
                    paddingTop: 0,
                    whiteSpace: 'pre-wrap',
                    backgroundColor: 'white'
                }}
            >
                <code className="language-clike">
                    {this.props.code}
                </code>
            </pre>
        );
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
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
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
}));

function SketchRestart(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error
    });

    const restartSketch = () => {
        if (!loading) {
            setSuccess(false);
            setError(false);
            setLoading(true);
            const data = {
                "sketch_name": props.title,
                "sketch": props.arduino,
                "sketch_xml": props.xml
            };
            if (process.env.REACT_APP_SAME_SERVER === "true") {
                fetch(`${window.location.origin}/api/upload`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'sessionID': props.sessionID },
                    body: JSON.stringify(data)
                })
                    .then(() => {
                        setLoading(false);
                        setSuccess(true);
                        setTimeout(() => { setSuccess(false) }, 2000);
                    })
                    .catch(() => {
                        setLoading(false);
                        setError(true);
                        setTimeout(() => { setError(false) }, 2000);
                    });
            } else {
                fetch(`${process.env.REACT_APP_REMOTE_BACKEND}/api/upload`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'sessionID': props.sessionID },
                    body: JSON.stringify(data)
                })
                    .then(() => {
                        setLoading(false);
                        setSuccess(true);
                        setTimeout(() => { setSuccess(false) }, 2000);
                    })
                    .catch(() => {
                        setLoading(false);
                        setError(true);
                        setTimeout(() => { setError(false) }, 2000);
                    });
            }
        }
    }

    return (
        <Tooltip title="Lade das Programm erneut auf die senseBox" arrow>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Fab
                        aria-label="save"
                        className={buttonClassname}
                        onClick={restartSketch}
                        style={{ height: "48px", width: "48px" }}
                    >
                        {success ? <CheckIcon /> : error ? <CloseIcon /> : <ReplayIcon />}
                    </Fab>
                    {loading && <CircularProgress size={58} className={classes.fabProgress} />}
                </div>
            </div>
        </Tooltip>
    );
}

SketchDetail.propTypes = {
    closeDetails: PropTypes.func.isRequired,
    sketchDetail: PropTypes.object.isRequired,
    sessionID: PropTypes.string,
    camUrl: PropTypes.string
}

const mapStateToProps = state => ({
    sketchDetail: state.sketchDetail,
    sessionID: state.general.sessionID,
    camUrl: state.general.camUrl
});

export default connect(mapStateToProps, { closeDetails })(SketchDetail);
