const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cashBalance: {
        type: Number,
        required: true,
    },
    avatar: {
        current: {
            type: String,
            required: true
        },
        owned: {
            type: [String],
            required: true
        }
    },
    cardBack: {
        current: {
            type: String,
            required: true
        },
        owned: {
            type: [String],
            required: true
        }
    },
    // friends will be an array of friend models
    friends: [{
        _id: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true,
})

module.exports = User = mongoose.model('User', UserSchema);