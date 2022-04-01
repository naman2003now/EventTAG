const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    RegistrationNumber: {
        type: String,
        required: true,
        unique: true,
        match: [
            /(17|18|19|20|21)[a-z|A-Z]{3}[0-9]{4}/,
            "Please fill a valid Registration Number",
        ],
    },
    VitMail: {
        type: String,
        required: true,
        unique: true,
        match: [
            /(.*)(\d){4}@vitstudent.ac.in/,
            "Please fill a valid VIT email address",
        ],
    },
    ValorantRank: { type: String, required: true },
    ValorantId: { type: String, required: true },
    discord: {
        type: String,
        required: true,
        match: [/(.*)#(.){4}/, "Please fill a valid discord id"],
    },
    phoneNumber: {
        type: Number,
        required: true,
        match: [/^\+?[0-9-]+$/, "Please fill a valid phone number"],
    },
    team: {
        type: String,
    },
});

module.exports = mongoose.model("ValorantPlayer", PlayerSchema);
