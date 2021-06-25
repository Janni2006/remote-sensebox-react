import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDetails } from '../actions/sketchDetailsActions';

import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import Queue from './Home/Queue';
import Sketches from './Home/Sketches';
import UploadDialog from './Home/UploadDialog';
import SketchDetail from './Home/SketchDetails';
import Snackbar from './Snackbar';

import * as Blockly from "blockly/core";

import { faPlus, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import socket from '../helpers/socketConnection';

const Accordion = withStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderBottom: `1px solid white`,
        marginBottom: '-1px',
        minHeight: '50px',
        '&$expanded': {
            minHeight: '50px',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            expanded: true,
            componentHeight: null,
            componentWidth: null,
            videoWidth: null,
            videoHeight: null,
            snackbar: false,
            type: '',
            key: '',
            message: '',
        };
        this.myDiv = React.createRef();
        this.liveVideo = React.createRef();
    }

    componentDidMount() {
        console.log(process.env)
        this.setState({
            componentHeight: this.myDiv.current.offsetHeight,
            componentWidth: this.myDiv.current.offsetWidth,
            videoWidth: this.liveVideo.current.offsetHeight,
            videoHeight: this.liveVideo.current.offsetWidth * 0.5625
        });
        socket.emit("initialQueue");
    }

    componentDidUpdate(props, state) {
        if (this.myDiv.current && this.myDiv.current.offsetHeight !== this.state.componentHeight) {
            this.setState({ componentHeight: this.myDiv.current.offsetHeight });
        }
        if (this.myDiv.current && this.myDiv.current.offsetWidth !== this.state.componentWidth) {
            this.setState({ componentWidth: this.myDiv.current.offsetWidth });
        }
        if (this.liveVideo.current && this.liveVideo.current.offsetWidth !== this.state.videoWidth) {
            this.setState({
                videoWidth: this.liveVideo.current.offsetWidth,
                videoHeight: this.liveVideo.current.offsetWidth * 0.5625
            });
        }
    }

    onChange = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    toggleDialog = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} style={{ position: 'relative' }}>
                        <Card style={{ height: '55vh', margin: '1vH 0 0 0', overflow: 'hidden' }} ref={this.myDiv}>
                            <Accordion
                                square={true}
                                style={{ margin: 0 }}
                                expanded={this.state.expanded}
                                onChange={this.onChange}
                            >
                                <AccordionSummary>
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>{Blockly.Msg.home_queue}</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: 'calc(55vh - 100px)', width: `${this.state.componentWidth}px`, backgroundColor: 'white' }}>
                                    <Queue />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                square={true}
                                style={{ margin: 0 }}
                                expanded={!this.state.expanded}
                                onChange={this.onChange}
                            >
                                <AccordionSummary>
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>{Blockly.Msg.home_private_sketches}</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: 'calc(55vh - 100px)', width: `${this.state.componentWidth}px`, backgroundColor: 'white' }}>
                                    <Sketches />
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                        {this.state.componentHeight < this.state.videoHeight ?
                            <Card style={{ height: this.props.sketchDetail.show ? "24vh" : `calc(${this.state.videoHeight}px - 57vh)`, margin: '2vH 0 0 0', overflow: 'hidden', maxHeight: "31vh", minHeight: "20vh" }}>
                                <Typography>
                                    <p style={{ margin: "0", padding: "0 10px", fontSize: "2.5vh" }} align="center" >{Blockly.Msg.home_upload}</p>
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    style={{ height: "15vh" }}
                                    spacing={7}
                                >
                                    <Grid item md={12} lg={6} style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'absolute', left: '50%', top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <Fab
                                                variant="extended"
                                                onClick={() => {
                                                    this.setState({ open: true })
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '1vw' }} />
                                            Upload
                                        </Fab>
                                        </div>
                                    </Grid>
                                    <Grid item md={12} lg={6} style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'absolute', left: '50%', top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <Link to={"/blockly"} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Fab
                                                    variant="extended"
                                                    color="primary"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1vw' }} />
                                                Blockly
                                            </Fab>
                                            </Link>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card> : null}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card style={{ height: this.props.sketchDetail.show ? '81vh' : `${this.state.videoHeight}px`, margin: '1vH 0 0 0', overflow: 'hidden', padding: '0px', maxHeight: "88vh" }} ref={this.liveVideo}>
                            {this.props.sketchDetail.show ?
                                <SketchDetail />
                                : <iframe 
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
                                />
                            }
                        </Card>
                    </Grid>
                    {this.state.componentHeight >= this.state.videoHeight ?
                        <Grid item xs={12}>
                            <Card style={{ height: "24vh", margin: '2vH 0 0 0', overflow: 'hidden' }}>
                                <Typography>
                                    <p style={{ margin: "0", padding: "0 10px", fontSize: "2.5vh" }} align="center" >Erstelle deine eigenen Sketches!</p>
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    style={{ height: "15vh" }}
                                    spacing={7}
                                >
                                    <Grid item md={12} lg={6} style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'absolute', left: '50%', top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <Fab
                                                variant="extended"
                                                onClick={() => {
                                                    this.setState({ open: true })
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '1vw' }} />
                                            Upload
                                        </Fab>
                                        </div>
                                    </Grid>
                                    <Grid item md={12} lg={6} style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'absolute', left: '50%', top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <Link to={"/blockly"} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Fab
                                                    variant="extended"
                                                    color="primary"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1vw' }} />
                                                Blockly
                                            </Fab>
                                            </Link>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid> : null}
                </Grid>
                <UploadDialog open={this.state.open} toggleDialog={() => { this.toggleDialog() }} />
                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.message}
                    type={this.state.type}
                    key={this.state.key}
                />
            </div >
        );
    };
}

Home.propTypes = {
    message: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    message: state.message,
    sketchDetail: state.sketchDetail,
    camUrl: state.general.camUrl
});

export default connect(mapStateToProps, { openDetails })(Home);
