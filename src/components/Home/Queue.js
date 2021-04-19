import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';

function Queue() {
    const [queue, setQueue] = React.useState([]);

    React.useEffect(() => {
        const timer = setInterval(async function () {
            const response = await fetch(`${process.env.REACT_APP_REMOTE_BACKEND}/api/queue`, {
                method: "GET",
                headers: {
                    deviceID: localStorage.getItem("deviceID").toString(),
                },
            });
            const data = await response.json();
            setQueue(data.queue);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [queue]);
    return (
        <List style={{ margin: '10px' }}>
            {queue && queue.map(queue_item => {
                return < QueueObject
                    key={queue_item.id}
                    friendly_name={queue_item.friendly_name}
                    private={queue_item.private}
                    running={queue_item.running}
                    progress={queue_item.progress}
                />
            })}
            {queue && queue.length === 0 ? <p>Es wartet aktuell niemand</p> : null}
        </List>
    )
}

class QueueObject extends Component {
    render() {
        return (
            <ListItem style={{ backgroundColor: 'white', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)', marginBottom: '10px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <p>{this.props.friendly_name}</p>
                        {this.props.running ? <CircularProgress /> : null}
                        {/* {this.props.running ? <LinearProgress_api progress={this.props.progress} /> : null} */}
                        {this.props.running ? <LinearProgress variant="determinate" value={this.props.progress} /> : null}
                    </Grid>
                </Grid>
            </ListItem>

        );
    }
}

export default Queue;