const express = require('express');
const apiRouter = express.Router();

const uploadRouter = require('./upload');

apiRouter.use("/upload", uploadRouter);

module.exports = apiRouter;