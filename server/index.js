const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const axios = require('axios').default;
const startJobs = require('./handlers/startHandler');
const apiRouter = require('./api/api');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

require('dotenv/config')

global.__basedir = __dirname.split("/").splice(0, __dirname.split("/").length - 1).join("/")


app.use(cors({ credentials: true }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'));
// app.use(middlewares);

app.use("/api", apiRouter);

app.get('/', (req, res) => { res.sendFile(__dirname + "/index.html") });

startJobs();

app.listen(process.env.PORT || 4000, '0.0.0.0',
  () => console.log(`Example app listening at http://localhost:${process.env.PORT || 4000}`)
);

//start json-server
server.use(middlewares);
server.use(router);
server.listen(3000, '127.0.0.1', () => {
  console.log("JSON Server is running")
})
