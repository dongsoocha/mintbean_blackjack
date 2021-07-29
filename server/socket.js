const game = require('./gameLogic/game')

var socket = require("socket.io")
exports.socketConnect = function (server) {

    const io = socket(server);

    io.on("connection", socket => {

    })
}