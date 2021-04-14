import React, { Component } from 'react';
import QueueObject from "./QueueItem"

class Queue extends Component {
    state = {
        queue: []
    }

    getData_intervalID;
    componentDidMount() {
        this.getData();
        this.getData_intervalID = setInterval(this.getData, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.getData_intervalID);
    }

    getData = () => {
        fetch("http://192.168.1.134/api/queue", {
            method: 'GET',
            headers: {
                'deviceID': localStorage.getItem("deviceID").toString()
            },
        })
            .then((response) => response.json())
            .then((data) => {
                var id = 1;
                var new_queue = [];
                for (var c_position = 0; c_position < data.length; c_position++) {
                    new_queue.push({ id: id, friendly_name: data[c_position].friendly_name });
                    id++;
                }
                this.setState({ queue: new_queue })
            })
    }

    render() {
        return (
            <div>
                { this.state.queue.map(queue_item => <QueueObject key={queue_item.id} friendly_name={queue_item.friendly_name} />)}
            </div>

        )
    }
}

export default Queue;
