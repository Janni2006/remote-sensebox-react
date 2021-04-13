const CronJob = require('cron').CronJob;
const axios = require('axios').default;

export default job = new CronJob('1 * * * * *', function () {
    axios.get('http://localhost/json-server/uploads').then(function (response) {
        for (const test of response.data) {
            if (test.created < Date.now() - 216000000) {
                axios.delete('http://localhost/json-server/uploads/' + test.id);
            }
        }
    });
}, null, true, 'America/Los_Angeles');
