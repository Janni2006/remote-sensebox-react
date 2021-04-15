const express = require('express');
const sketchRouter = express.Router();
const axios = require('axios').default;

sketchRouter.get('/private-sketches', (req, res) => {
    axios.get(process.env.JSON_SERVER + '/uploads?user=' + req.headers.deviceid).then(function (response) {
        var data = [];

        for (const sketch in response.data) {
            data.push({
                blockly: sketch.blockly_xml === undefined ? false : true,
                finished: sketch.demo_completed,
                friendly_name: sketch.friendly_name
            });
        }
        res.json(data);
    })
        .catch(function (error) {
            // handle error
            res.status(500).json(error)
        });
});

module.exports = queueRouter;