const express = require('express');
const queueRouter = express.Router();
const axios = require('axios').default;

queueRouter.get('/queue', (req, res) => {
    axios.get(process.env.JSON_SERVER + '/uploads').then(function (response) {
        const queue = [];

        for (const item of response.data) {
            if (item.queue_position != 0)
                queue.push({
                    friendly_name: item.friendly_name,
                    private: item.user == req.headers.deviceid,
                    running: item.queue_position == 1,
                    queue_position: item.queue_position
                });
        }
        const queue_ordered = Object.keys(queue).map(function (key) {
            return queue[key];
        }).sort(function (firstItem, secondItem) {
            return firstItem.queue_position < secondItem.queue_position;
        });
        res.json(queue_ordered);
    })
        .catch(function (error) {
            // handle error
            res.status(500).json(error)
        })
});

module.exports = queueRouter;