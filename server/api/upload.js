const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;
const uploadRouter = express.Router();

uploadRouter.get("/", (req, res) => {
    console.log(req.headers.deviceid);
    res.send(JSON.stringify(req.session));
});

uploadRouter.post("/", async function (req, res) {
    console.log(req.headers.deviceid)
    let sketch;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sketch = req.files.file;
    if (!fs.existsSync(path.join(__basedir, '/uploads/', req.headers.deviceid))) {
        fs.mkdirSync(path.join(__basedir, '/uploads/', req.headers.deviceid));
    }
    uploadPath = path.join(__basedir, '/uploads/', req.headers.deviceid, '/') + crypto.randomBytes(4).toString('hex') + ".ino";

    // if (sketch.name.split(".")[sketch.name.split(".").length] != "ino") {
    //     return res.status(400).send("Invalid data type!")
    // }

    var queuePosition = 1;
    await axios.get(process.env.JSON_SERVER + '/uploads').then(function (response) {
        for (const test of response.data) {
            if (test.queue_position != 0) {
                queuePosition++;
            }
        }
    });

    sketch.mv(uploadPath, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        axios.post(process.env.JSON_SERVER + '/uploads', {
            sketch: uploadPath,
            queue_position: queuePosition,
            friendly_name: sketch.name.split(".")[0],
            user: req.headers.deviceid,
            created: Date.now()
        })
            .then(res.send('File uploaded!'));

    });
})

module.exports = uploadRouter;