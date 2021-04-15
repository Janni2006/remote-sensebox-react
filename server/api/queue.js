const express = require('express');
const queueRouter = express.Router();
const axios = require('axios').default;

queueRouter.get('/queue', (req, res) => {
    axios.get(process.env.JSON_SERVER + '/uploads?demo_completed=false&_order=queue_position').then(function (response) {
        const queue = { queue: [], private: {} };

        for (const item of response.data) {
            if (!item.demo_completed) {
                var progress = Date.now() - item.uploaded;
                progress = Math.round((progress / process.env.SKETCH_RUNTIME) * 100);
                queue.queue.push({
                    friendly_name: item.friendly_name,
                    private: item.user == req.headers.deviceid,
                    running: item.queue_position == 0,
                    queue_position: item.queue_position,
                    progress: item.queue_position == 0 ? progress : 0
                });
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