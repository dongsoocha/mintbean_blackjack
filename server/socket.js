const game = require('./gameLogic/game')
let game1 = new game()

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

        socket.on("join-room", async ({ player }) => {
            await game1.addPlayer(player)
            io.emit("update-game-state", game1.getState())
        })

        socket.on("leave-room", ({ player }) => {
            game1.removePlayer(player)
            io.emit("update-game-state", game1.getState())
        })

        socket.on("hit", () => {
            game1.hit()
            io.emit("update-game-state", game1.getState())
        })

        socket.on("stand", () => {
            game1.stand()
            io.emit("update-game-state", game1.getState())
        })

        socket.on("get-game-state", () => {
            io.emit("update-game-state", game1.getState())
        })

        socket.on("start-game", () => {
            game1.startGame()
            io.emit("update-game-state", game1.getState())
        })

        socket.on("restart-game", () => {
            game1.restartGame()
            io.emit("update-game-state", game1.getState())
        })
    })
}