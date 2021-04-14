const CronJob = require('cron').CronJob;
const axios = require('axios').default;
const shell = require('shelljs');
const path = require('path');

module.exports = new CronJob('1 * * * * *', async function () {
    axios.get(process.env.JSON_SERVER + '/uploads').then(function (response) {
        for (const object of response.data) {
            if (object.created < Date.now() - 1000) {
                var result = ""
                axios.get(process.env.JSON_SERVER + '/uploads?user=' + object.user).then(function (second_response) {
                    if (second_response.data.length >= 2) {
                        result = shell.exec('sudo rm -r ' + object.sketch);
                    } else {
                        // console.log('sudo rm -rf ' + path.join(__basedir, '/uploads/', object.user, '/'))
                        result = shell.exec('sudo rm -rf ' + path.join(__basedir, '/uploads/', object.user, '/'));
                    }
                });
                console.log(result)
                axios.delete(process.env.JSON_SERVER + '/uploads/' + object.id);
            }
        }
    });
}, null, true, 'America/Los_Angeles');
