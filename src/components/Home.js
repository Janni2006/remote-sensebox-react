import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

class Home extends Component {
    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} style={{ position: 'relative' }}>

                </Grid>
                <Grid item xs={12} md={8}>
                </Grid>
            </Grid>
        );
    };
}


export default Home;
