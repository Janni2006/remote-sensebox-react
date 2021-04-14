const express = require('express');
const crypto = require('crypto');
const deviceRouter = express.Router();

deviceRouter.get('/device/register', function (req, res) {
    res.json({ deviceID: crypto.randomBytes(16).toString('hex') })
});

module.exports = deviceRouter;