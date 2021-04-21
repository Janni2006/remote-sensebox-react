import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDetails } from '../../actions/sketchDetailsActions';

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
                        <Grid item xs={11} md={11}>
                            <Card style={{ padding: "1vh 1vw" }}>
                                Downloade dieses Projekt
                                <div style={{ width: 'max-content', display: 'flex' }}>
                                    <Fab variant="extended">Arduino</Fab>
                                    <Fab variant="extended">Blockly</Fab>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={1} md={1}>
                            <Card>
                                hu
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Card>
                                hu
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
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
