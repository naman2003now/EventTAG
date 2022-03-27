const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	players: {
		type: [mongoose.SchemaType.ObjectId],
	},
})

module.exports = mongoose.model("Team", TeamSchema)
