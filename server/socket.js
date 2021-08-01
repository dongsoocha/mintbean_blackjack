const game = require('./gameLogic/game')

var socket = require("socket.io")
exports.socketConnect = function (server) {

    const io = socket(server, {
        cors: {
            origin: '*',
        }
    });

    io.on("connection", socket => {
        socket.on('test1', () => {
            console.log("testing success")
        })

        socket.on("send message", ({ messageObject }) => {
            console.log(messageObject.body)
            io.emit("message", { messageObject })
        })
    })
}