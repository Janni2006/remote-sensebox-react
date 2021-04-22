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

import { faPlus, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            message: ''
        };
        this.myDiv = React.createRef();
        this.liveVideo = React.createRef();
    }

    componentDidMount() {
        this.setState({
            componentHeight: this.myDiv.current.offsetHeight + 'px',
            componentWidth: this.myDiv.current.offsetWidth + 'px',
            videoWidth: this.liveVideo.current.offsetHeight,
            videoHeight: this.liveVideo.current.offsetWidth * 0.5625
        });
    }

    onChange = () => {
        this.setState({ expanded: !this.state.expanded });
        console.log(this.state)
    }

    toggleDialog = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        // var unequal = '<>';
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
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Warteschleife</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: 'calc(55vh - 100px)', width: this.state.componentWidth, backgroundColor: 'white' }}>
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
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Eigene Sketches</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: 'calc(55vh - 100px)', width: this.state.componentWidth, backgroundColor: 'white' }}>
                                    <Sketches />
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                        <Card style={{ height: this.props.sketchDetail.show ? "24vh" : `calc(${this.state.videoHeight}px - 57vh)`, margin: '2vH 0 0 0', overflow: 'hidden', maxHeight: "31vh" }}>
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
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card style={{ height: this.props.sketchDetail.show ? '81vh' : `${this.state.videoHeight}px`, margin: '1vH 0 0 0', overflow: 'hidden', padding: '0px', maxHeight: "88vh" }} ref={this.liveVideo}>
                            {this.props.sketchDetail.show ?
                                <SketchDetail />
                                : <iframe
                                    src="http://192.168.1.134:8080/player.html"
                                    name="restreamer-player"
                                    width="100%"
                                    height="100%"
                                    scrolling="no"
                                    frameBorder="0"
                                    webkitallowfullscreen="true"
                                    mozallowfullscreen="true"
                                    allowFullScreen="true"
                                    title="stream"
                                ></iframe>
                            }
                        </Card>
                    </Grid>
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
    sketchDetail: state.sketchDetail
});

export default connect(mapStateToProps, { openDetails })(Home);
