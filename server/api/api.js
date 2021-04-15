const express = require('express');
const apiRouter = express.Router();

const uploadRouter = require('./upload');
const deviceRouter = require('./devices');
const queueRouter = require('./queue');
const sketchRouter = require('./sketches');

apiRouter.use("/", uploadRouter);
apiRouter.use("/", deviceRouter);
apiRouter.use("/", queueRouter);
apiRouter.use("/", sketchRouter);

module.exports = apiRouter;