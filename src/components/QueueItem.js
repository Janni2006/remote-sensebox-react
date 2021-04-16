import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';

class QueueObject extends Component {
    render() {
        return (
            <ListItem style={{ backgroundColor: 'white', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)', marginBottom: '10px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <p>{this.props.friendly_name}</p>
                        {this.props.running ? <CircularProgress /> : null}
                        {this.props.running ? <LinearProgress_api progress={this.props.progress} /> : null}

                    </Grid>
                </Grid>
            </ListItem>

        );
    }
}

function LinearProgress_api(props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        setProgress(props.progress);
    }, [props.progress]);

    return (<LinearProgress variant="determinate" value={progress} />);
}

export default QueueObject;
