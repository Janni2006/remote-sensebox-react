const CronJob = require('cron').CronJob;
const axios = require('axios').default;
const shell = require('shelljs');
const path = require('path');

module.exports = new CronJob('1 * * * * *', async function () {
    axios.get(process.env.JSON_SERVER + '/uploads').then(function (response) {
        for (const object of response.data) {
            if (object.created < Date.now() - 1000) {
                axios.get(process.env.JSON_SERVER + '/uploads?user=' + object.user).then(function (second_response) {
                    if (second_response.data.length >= 2) {
                        shell.exec('sudo rm ' + object.path);
                    } else {
                        shell.exec('sudo rm -rf ' + path.join(__basedir, '/uploads/', object.user, '/'));
                    }
                });
                axios.delete(process.env.JSON_SERVER + '/uploads/' + object.id);
            }
        }
    });
}, null, true, 'America/Los_Angeles');
