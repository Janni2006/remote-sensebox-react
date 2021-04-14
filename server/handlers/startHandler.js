const deleteHandler = require("./deleteHandler");
const flashHandler = require("./flashHandler");

function startJobs() {
    deleteHandler.start();
    flashHandler.start();
}

module.exports = startJobs;