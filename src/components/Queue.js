import React, { Component } from 'react';
import QueueObject from "./QueueItem";
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const initialQueue = [{
    id: 0,
    friendly_name: "",
    private: false,
    running: false,
    progress: 0
}];

function Queue() {
    const [queue, setQueue] = React.useState([]);

    React.useEffect(() => {
        const timer = setInterval(async function () {
            const response = await fetch(window.location.origin + "/api/queue", {
                method: "GET",
                headers: {
                    deviceID: localStorage.getItem("deviceID").toString(),
                },
            });
            const data = await response.json();
            for (var i = 0; i < 5; i++) {
                console.log(setQueue(data.queue));
            }
            console.log(data.queue)
            console.log(queue)
            console.log(data.queue)
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const update = async () => {
        console.log(queue[0])
    }
    return (
        <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
            <Button variant="contained" onClick={update}>Default</Button>
            <List style={{ margin: '10px' }}>
                {queue.map(queue_item => {
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
                {queue.map(test => {
                    <p>{test.private}</p>
                })}
            </List>
        </div>
    )
}

export default Queue;
