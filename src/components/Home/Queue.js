import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Card } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';

import ReactLoading from 'react-loading';

function Queue() {
    const [queue, setQueue] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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
            setLoading(false);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div style={{ height: "calc(70vh - 100px)", width: "100%" }}>
            {loading ?
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '25%'
                    }}
                >
                    <ReactLoading type={"bubbles"} color={"#4eaf46"} height={50} width={'100%'} />
                </div> :
                <List>
                    <p>{queue.length}</p>
                    {queue && queue.map(queue_item => {
                        return < QueueObject
                            key={queue_item.id}
                            friendly_name={queue_item.friendly_name}
                            private={queue_item.private}
                            running={queue_item.running}
                            progress={queue_item.progress}
                        />
                    })}
                    {queue && queue.length === 0 ? <ListItem>Es wartet aktuell niemand</ListItem> : null}
                </List>
            }
        </div>

    )
}

class QueueObject extends Component {
    render() {
        return (
            <ListItem >
                <Card
                    style={{
                        height: '100%',
                        // width: 'calc(30vw - 22px)',
                        width: "100%",
                        overflow: 'hidden',
                        padding: "20px",
                        paddingTop: "5px",
                        paddingBottom: this.props.running ? "20px" : "5px"
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={this.props.running ? 11 : 12} md={this.props.running ? 8 : 12}>
                            <p>{this.props.friendly_name}</p>
                        </Grid>
                        {this.props.running ?
                            <Grid item xs={1} md={1}>
                                <CircularProgress size={24} />
                            </Grid>
                            : null}
                    </Grid>


                    {/* {this.props.running ? <LinearProgress_api progress={this.props.progress} /> : null} */}
                    {this.props.running ? <LinearProgress variant="determinate" value={this.props.progress} style={{ margin: "-20px", marginTop: "0px" }} /> : null}
                </Card>
            </ListItem>

        );
    }
}

export default Queue;