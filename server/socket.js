const game = require('./gameLogic/game')
let game1 = new game()
let timer;

var socket = require("socket.io")

exports.socketConnect = function (server) {

    const io = socket(server, {
        cors: {
            origin: '*',
        }
    });

    const resetTimer = () => {
        if (game1.inProgress) {
            io.emit(`force-player-to-stand-${game1.players[game1.currentPlayer].name}`)
        } else {
            game1.restartGame()
            if (game1.players.length > 1) { timer = setTimeout(resetTimer, 5000) }
        }
        io.emit("update-game-state-and-timer", game1.getState())
    }

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
            if (game1.players[game1.currentPlayer].name === player.name) {
                game1.stand()
            }
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