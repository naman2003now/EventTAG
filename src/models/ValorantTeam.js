const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    Leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
    },
});

module.exports = mongoose.model("ValorantTeam", TeamSchema);
