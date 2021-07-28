const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  players: new Array(7).fill(null),
}, {
    timestamps: true,
});

module.exports = Room = mongoose.model('Room', RoomSchema);