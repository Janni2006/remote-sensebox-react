const express = require('express');
const apiRouter = express.Router();

const uploadRouter = require('./upload');
const deviceRouter = require('./devices');
const queueRouter = require('./queue');

apiRouter.use("/", uploadRouter);
apiRouter.use("/", deviceRouter);
apiRouter.use("/", queueRouter);

module.exports = apiRouter;