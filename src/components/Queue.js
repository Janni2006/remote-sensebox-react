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
            var new_queue = [];
            await fetch("http://192.168.1.134/api/queue", {
                method: 'GET',
                headers: {
                    'deviceID': localStorage.getItem("deviceID").toString()
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Processing Data")
                    var id = 1;

                    for (var c_position = 0; c_position < data.length; c_position++) {
                        new_queue.push({
                            id: id,
                            friendly_name: data[c_position].friendly_name,
                            private: data[c_position].private,
                            running: data[c_position].running,
                            progress: data[c_position].progress
                        });
                        id++;
                    }
                    console.log(new_queue)
                });
            setQueue(new_queue)
            console.log(queue)
        }, 1000)
        return () => {
            clearInterval(timer);
        };
    }, []);
    const update = () => {
        var new_queue = [];
        fetch("http://192.168.1.134/api/queue", {
            method: 'GET',
            headers: {
                'deviceID': localStorage.getItem("deviceID").toString()
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Processing Data")
                var id = 1;

                for (var c_position = 0; c_position < data.length; c_position++) {
                    new_queue.push({
                        id: id,
                        friendly_name: data[c_position].friendly_name,
                        private: data[c_position].private,
                        running: data[c_position].running,
                        progress: data[c_position].progress
                    });
                    id++;
                }
                console.log(new_queue)
            });
        setQueue(new_queue)
        console.log(queue)
    }
    return (
        <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'red' }}>
            <Button variant="contained" onClick={update}>Default</Button>
            <List style={{ margin: '10px' }}>
                {/* {queue.map(queue_item => {
                    < QueueObject
                        key={queue_item.id}
                        friendly_name={queue_item.friendly_name}
                        private={queue_item.private}
                        running={queue_item.running}
                        progress={queue_item.progress}
                    />

                })} */}
            </List>
        </div>
    )
}

export default Queue;
