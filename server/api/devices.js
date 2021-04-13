const express = require('express');
const crypto = require('crypto');
const deviceRouter = express.Router();

deviceRouter.get('/register', function (req, res) {
    res.json({ deviceID: crypto.randomBytes(8).toString('hex') })
});

module.exports = deviceRouter;