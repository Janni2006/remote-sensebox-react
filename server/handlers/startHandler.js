const deleteHandler = require("./deleteHandler")

function startJobs() {
    deleteHandler.start();
}

module.exports = startJobs;