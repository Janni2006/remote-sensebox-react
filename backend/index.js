const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
// const CronJob = require('cron').CronJob;
const axios = require('axios').default;

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


app.get('/upload', (req, res) => { console.log(req.sessionID), res.send(JSON.stringify(req.session)) });

app.post('/upload', function (req, res) {
  let sketch;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sketch = req.files.file;
  shell.exec('mkdir ' + path.join(__basedir, '/uploads/', sketch.name.split(".")[0]))
  uploadPath = path.join(__basedir, '/uploads/', sketch.name.split(".")[0], '/') + sketch.name;

  console.log("Test")
  sketch.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    axios.post('http://localhost:3000/uploads', {
      skripts: [
        {
          path: uploadPath,
          wait_position: 0
        }
      ],
      profile: {
        sessionID: req.sessionID
      }
    });
    res.send('File uploaded!');
  });
});

app.get('/sketches', (req, res) => {
  axios.get('http://localhost:3000/uploads?skripts[0].wait_position=0').then(function (response) {
    // handle success
    console.log(response);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

app.get('/', (req, res) => { res.sendFile(__dirname + "/index.html") });

// var job = new CronJob('1 * * * * *', function () {
//   folders = fs.readdirSync(__basedir + '/uploads/');
//   var oldestTime;
//   var oldest;

//   for (var i = 0; i < folders.length; i++) {
//     let stats = fs.statSync(path.join(__basedir, '/uploads/', folders[i]));
//     if (oldestTime == undefined || stats.mtime < oldestTime) {
//       oldestTime = stats.mtime;
//       oldest = folders[i];
//     }
//   }
//   if (oldest != undefined) {
//     //compile sketch and flash mcu
//     shell.exec('arduino-cli compile --upload ' + path.join(__basedir, '/uploads/', oldest, '/') + oldest + '.ino' + ' --port /dev/ttyACM0 --fqbn sensebox:samd:sb');
//     // delete folder with sketch
//     shell.exec('rm -r ' + path.join(__basedir, '/uploads/', oldest));
//   }
// }, null, true, 'America/Los_Angeles');
// job.start();

app.listen(process.env.PORT || 4000,
  () => console.log(`Example app listening at http://localhost:${process.env.PORT || 4000}`)
);
