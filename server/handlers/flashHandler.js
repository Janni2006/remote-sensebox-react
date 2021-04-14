const CronJob = require('cron').CronJob;
const axios = require('axios').default;

module.exports = new CronJob('1 * * * * *', function () {
    axios.get(process.env.JSON_SERVER + '/uploads?queue_position=1').then(function (response) {
        if (response.data.length > 0) {
            console.log('arduino-cli compile --upload ' + response.data[0].sketch + ' --port /dev/ttyACM0 --fqbn sensebox:samd:sb');
            axios.put(process.env.JSON_SERVER + '/uploads/' + response.data[0].id, {
                sketch: response.data[0].sketch,
                queue_position: 0,
                friendly_name: response.data[0].friendly_name,
                user: response.data[0].user,
                created: response.data[0].created,
                uploaded: Date.now
            });
        }
    });
    axios.get(process.env.JSON_SERVER + '/uploads').then(function (response) {
        for (const object of response.data) {
            if (object.queue_position != 0) {
                axios.put(process.env.JSON_SERVER + '/uploads/' + object.id, {
                    sketch: object.sketch,
                    queue_position: object.queue_position - 1,
                    friendly_name: object.friendly_name,
                    user: object.user,
                    created: object.created,
                    uploaded: object.uploaded
                });
            }
        }
    });
}, null, true, 'America/Los_Angeles');
