const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  players: [
    {
      _id: {
        type: String,
        required: true,
      },
    },
  ],
}, {
    timestamps: true,
});

module.exports = Room = mongoose.model('Room', RoomSchema);