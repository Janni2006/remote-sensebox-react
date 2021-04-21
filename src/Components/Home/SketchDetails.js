import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDetails } from '../../actions/sketchDetailsActions';

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import Grid from '@material-ui/core/Grid';
import { Card, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class SketchDetail extends Component {
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={11} md={11}>
                        {this.props.sketchDetail.name}
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <IconButton onClick={this.props.closeDetails} >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <div style={{ padding: "2vh 2vw" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6}>
                            <Card style={{ padding: "1vh 1vw" }}>
                                Downloade dieses Projekt
                                <div style={{ width: 'max-content', display: 'flex' }}>
                                    <Fab variant="extended">Arduino</Fab>
                                    <Link to={`/blockly/${this.props.sketchDetail.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Fab
                                            variant="extended"
                                            color="primary"
                                        >
                                            Blockly
                                        </Fab>
                                    </Link>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Card style={{ height: "50%" }}>
                                <Code arduino={this.props.sketchDetail.code.sketch} />
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
        console.log(this.props.arduino)
    }

    render() {
        return (
            <pre className="line-numbers" style={{ paddingBottom: 0, width: '100%', overflow: 'auto', scrollbarWidth: 'thin', height: 'calc(100% - 30px)', margin: '15px 0', paddingTop: 0, whiteSpace: 'pre-wrap', backgroundColor: 'white' }}>
                <code className="language-clike">
                    {this.props.arduino}
                </code>
            </pre>
        );
    }
}

SketchDetail.propTypes = {
    closeDetails: PropTypes.func.isRequired,
    sketchDetails: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    sketchDetail: state.sketchDetail
});

export default connect(mapStateToProps, { closeDetails })(SketchDetail);
