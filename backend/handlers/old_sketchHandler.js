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
