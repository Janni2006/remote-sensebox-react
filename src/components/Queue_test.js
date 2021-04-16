import React, { Component } from 'react';
import QueueObject from "./QueueItem";
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

class Queue extends Component {
    state = {
        queue: []
    }

    timer;
    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const response = await fetch(window.location.origin + "/api/queue", {
            method: "GET",
            headers: {
                deviceID: localStorage.getItem("deviceID").toString(),
            },
        });
        await response.json().then((data) => { this.setState({ queue: data.queue }); });

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
                <List style={{ margin: '10px' }}>
                    {this.state.queue.map(queue_item => {
                        // < QueueObject
                        //     key={queue_item.id}
                        //     friendly_name={queue_item.friendly_name}
                        //     private={queue_item.private}
                        //     running={queue_item.running}
                        //     progress={queue_item.progress}
                        // />
                        <p key={queue_item.id}>{queue_item.running}</p>
                    })}
                </List>
            </div>
        )
    }
}

export default Queue;
