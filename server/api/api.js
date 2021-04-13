const express = require('express');
const apiRouter = express.Router();

const uploadRouter = require('./upload');
const deviceRouter = require('./devices')

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/device", deviceRouter);

module.exports = apiRouter;