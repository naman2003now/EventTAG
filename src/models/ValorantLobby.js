const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
    team1: String,
    team2: String,
    time: mongoose.Schema.Types.Date,
});

module.exports = mongoose.model("ValorantLobby", LobbySchema);
