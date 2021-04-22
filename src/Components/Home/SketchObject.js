import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDetails, closeDetails } from '../../actions/sketchDetailsActions';

import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';

class SketchObject extends Component {
    componentDidMount() {
        console.log(this.props.sketchDetail)
    }

    openDetails = () => {
        this.props.openDetails(this.props.code);
    }

    render() {
        return (
            <ListItem >
                <Card style={{ height: '60px', width: '100%', overflow: 'hidden', padding: "5px" }}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        style={{ height: "60px" }}
                    >
                        <Grid item xs={6} md={6}>
                            {this.props.friendly_name}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {this.props.finished ?
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        margin: "0px",
                                        marginTop: "2.5px",
                                        marginBottom: "2.5px",
                                        border: "1.5px solid rgb(47, 107, 43)",
                                        width: "48px",
                                        padding: "1.5px 4px 1.5px 4px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(78, 175, 71, .2)",
                                        color: "rgb(47, 107, 43)"
                                    }}
                                >
                                    Finished
                                        </p> : null}
                            {this.props.blockly ?
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        margin: "0px",
                                        marginTop: "2.5px",
                                        marginBottom: "2.5px",
                                        border: "1.5px solid rgb(153, 91, 165)",
                                        width: "40px",
                                        padding: "1.5px 4px 1.5px 4px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(187,112,201, .2)",
                                        color: "rgb(153, 91, 165)"
                                    }}
                                >
                                    Blockly
                                        </p> : null}
                        </Grid>
                        <Grid item xs={2} md={2}>
                            {this.props.sketchDetail.id !== this.props.code ?
                                < IconButton onClick={this.openDetails} >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                                : < IconButton onClick={this.props.closeDetails} >
                                    <CloseIcon />
                                </IconButton>
                            }
                        </Grid>
                    </Grid>
                </Card>
            </ListItem >
        );
    }
}

SketchObject.propTypes = {
    openDetails: PropTypes.func.isRequired,
    closeDetails: PropTypes.func.isRequired,
    sketchDetails: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    sketchDetail: state.sketchDetail
});

export default connect(mapStateToProps, { openDetails, closeDetails })(SketchObject);