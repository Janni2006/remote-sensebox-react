import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

class QueueObject extends Component {
    state = {
        friendly_name: this.props.friendly_name
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <p>{this.state.friendly_name}</p>
                </Grid>
            </Grid>
        );
    }
}

export default QueueObject;