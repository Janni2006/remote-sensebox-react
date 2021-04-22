import React, { Component } from 'react';
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

import Grid from '@material-ui/core/Grid';
import { Card, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import LaunchIcon from '@material-ui/icons/Launch';
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SketchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoWidth: null,
            videoHeight: null,
        };
        this.video = React.createRef();
    }

    componentDidMount() {
        this.setState({
            videoWidth: this.video.current.offsetHeight,
            videoHeight: this.video.current.offsetWidth * 0.5625
        });
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
                            <Card style={{ height: `${this.state.videoHeight}px` }} ref={this.video}>
                                <iframe
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
                            </Card>
                            <Card style={{ padding: "1vh 1vw", height: "8vh", marginTop: "2.5vh", }}>
                                Downloade dieses Projekt
                                <div style={{ width: 'max-content', display: 'flex' }}>
                                    <Fab
                                        variant="extended"
                                        onClick={() => this.downloadInoFile()}
                                    >
                                        Arduino
                                    </Fab>
                                    <Fab
                                        variant="extended"
                                        onClick={() => this.downloadXmlFile()}
                                    >
                                        <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: '0.5vw' }} size="md" />
                                        XML
                                    </Fab>
                                    {this.props.sketchDetail.blockly ?
                                        <Tooltip title="Öffne das Programm in der Blockly-Umgebung" arrow>
                                            <Link to={`/blockly/${this.props.sketchDetail.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Fab
                                                    variant="extended"
                                                    color="primary"
                                                >
                                                    <LaunchIcon style={{ marginRight: "1vw" }} />
                                                Blockly
                                            </Fab>
                                            </Link>
                                        </Tooltip>
                                        : null
                                    }
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Card style={{ height: "49vh" }}>
                                <Code arduino={this.props.sketchDetail.code.sketch} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Card style={{ height: "20vh" }}>
                                <Code arduino="Serielle Konsole" />
                            </Card>
                        </Grid>
                    </Grid>
                </div>
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
            <pre className="line-numbers" style={{ paddingBottom: 0, width: '100%', overflow: 'auto', scrollbarWidth: 'thin', height: '100%', margin: '0', paddingTop: 0, whiteSpace: 'pre-wrap', backgroundColor: 'white' }}>
                <code className="language-clike">
                    {this.props.arduino}
                </code>
            </pre>
        );
    }
}

SketchDetail.propTypes = {
    closeDetails: PropTypes.func.isRequired,
    sketchDetail: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    sketchDetail: state.sketchDetail
});

export default connect(mapStateToProps, { closeDetails })(SketchDetail);
