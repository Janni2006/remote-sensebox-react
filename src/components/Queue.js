import React, { Component } from 'react';
import QueueObject from "./QueueItem";
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

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
            setQueue(data.queue);
            console.log(data)
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
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
            </List>
        </div>
    )
}

export default Queue;
