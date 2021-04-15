import React, { Component } from 'react';
import QueueObject from "./QueueItem";
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

class Queue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: []
        };
    }

    timer;
    componentDidMount() {
        this.timer = setInterval(async function () {
            const response = await fetch(window.location.origin + "/api/queue", {
                method: "GET",
                headers: {
                    deviceID: localStorage.getItem("deviceID").toString(),
                },
            });
            const data = await response.json();
            this.setState({ queue: data.queue });
            console.log(new_queue)
            console.log(queue)
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    change = new_queue => {
        this.setState((state, props) => ({
            queue: [
                ...state.queue,
                {
                    id: new_queue[0].id,
                    friendly_name: new_queue[0].friendly_name,
                    private: new_queue[0].private,
                    running: new_queue[0].running,
                    progress: new_queue[0].progress
                }
            ]
        }));
    }
    render() {
        let { queue } = this.state
        const renderList = () => {
            if (queue.length === 0) {
                return <p>Empty</p>;
            } else {
                var test = [];
                console.log(queue);
            }
        }
        return (
            <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
                <List style={{ margin: '10px' }}>
                    {renderList()}
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
                    <p>Hallo</p>
                    {this.state.queue.map(test => {
                        <p>{test.private}</p>
                    })}
                </List>
            </div>
        )
    }
}

export default Queue;
