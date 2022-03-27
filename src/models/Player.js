const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
	fullName: {type: String, required: true},
	RegistrationNumber: {type: String, required: true},
	VitMail: {type: String, required: true},
	gameName: {type: String, required: true},
	rank: {type: String, required: true},
	gameId: {type: String, required: true},
	discord: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
})

module.exports = mongoose.model("Player", PlayerSchema)
