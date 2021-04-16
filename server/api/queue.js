const express = require('express');
const queueRouter = express.Router();
const axios = require('axios').default;

queueRouter.get('/queue', (req, res) => {
    axios.get(process.env.JSON_SERVER + '/uploads?demo_completed=false&_order=queue_position').then(function (response) {
        const queue = { queue: [], private: { begin_30: false }, current_wait: 0 };

        if (response.data.length > 0) {
            for (const item of response.data) {
                if (!item.demo_completed) {
                    var progress = Date.now() - item.uploaded;
                    progress = (progress / process.env.SKETCH_RUNTIME) * 100;
                    progress = progress > 100 ? 100 : progress;
                    var time_left = item.uploaded ? process.env.SKETCH_RUNTIME * (100 - progress) : process.env.SKETCH_RUNTIME;
                    // if (response.data[1].user !== undefined) {
                    //     if (time_left <= 30000 && response.data[1].user == req.headers.deviceid) {
                    //         queue.private.begin_30 = true;
                    //     }
                    // }
                    // queue.current_wait = queue.current_wait + time_left;
                    queue.queue.push({
                        id: item.id,
                        friendly_name: item.friendly_name,
                        private: item.user == req.headers.deviceid,
                        running: item.queue_position == 0,
                        queue_position: item.queue_position,
                        progress: item.queue_position == 0 ? Math.round(progress) : 0
                    });
                }
            }
        }
        res.json(queue);
    })
        .catch(function (error) {
            // handle error
            res.status(500).json(error)
        });
});

module.exports = queueRouter;