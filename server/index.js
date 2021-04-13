const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const axios = require('axios').default;

const apiRouter = require('./api/api')

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
require('dotenv/config')

global.__basedir = __dirname.split("/").splice(0, __dirname.split("/").length - 1).join("/")


app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
  secret: "asdhfgmhjmjasesadtzrzrtzrtzbnvbn",
  resave: false,
  saveUninitialized: true,
  rolling: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 6
  },
}));
app.use(express.static('public'));
app.use(middlewares);
app.use("/json-server", router);

app.use("/api", apiRouter);

app.get('/queue', (req, res) => {
  axios.get('http://localhost/json-server/uploads').then(function (response) {
    const queue = [];

    for (const test of response.data) {
      if (test.queue_position != 0)
        queue.push(test);
    }
    res.json(queue)
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

app.get('/', (req, res) => { res.sendFile(__dirname + "/index.html") });

app.listen(process.env.PORT || 4000,
  () => console.log(`Example app listening at http://localhost:${process.env.PORT || 4000}`)
);
