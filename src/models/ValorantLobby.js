const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
    team1: [mongoose.SchemaType.ObjectId],
    team2: [mongoose.SchemaType.ObjectId],
    game: { Type: String, required: true },
});

module.exports = mongoose.model("Lobby", LobbySchema);
