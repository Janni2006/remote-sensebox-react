import React, { Component } from 'react';
import QueueObject from "./QueueItem";
import List from '@material-ui/core/List';

class Queue extends Component {
    state = {
        queue: [],
        empty: true
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
                    new_queue.push({
                        id: id,
                        friendly_name: data[c_position].friendly_name,
                        private: data[c_position].private,
                        running: data[c_position].running,
                        progress: data[c_position].progress
                    });
                    id++;
                    console.log(data[c_position].progress)
                }
                this.setState({ queue: new_queue, empty: false })
                if (data.length == 0) {
                    this.setState({ empty: true })
                }
            })
    }

    render() {
        return (
            <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
                {this.state.empty ? <p>Es befindet sich kein Sketch in der Warteliste</p> : <List>
                    {this.state.queue.map(queue_item =>
                        < QueueObject
                            key={queue_item.id}
                            friendly_name={queue_item.friendly_name}
                            private={queue_item.private}
                            running={queue_item.running}
                            progress={queue_item.progress}
                        />
                    )}
                </List>}
            </div>
        )
    }
}

export default Queue;
