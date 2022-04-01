const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const CSGOPlayer = require("./models/CSGOPlayer");
const CSGOTeam = require("./models/CSGOTeam");
const ValorantPlayer = require("./models/ValorantPlayer");
const ValorantTeam = require("./models/ValorantTeam");
const app = express();
const cors = require("cors");

app.use(bodyparser());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public"));
app.use("/css", express.static(path.join(__dirname, "../public/css")));

const uri =
    "mongodb+srv://paradrone:01000101@eventtag.wfz91.mongodb.net/Tournament?retryWrites=true&w=majority";

mongoose.connect(uri, () => {
    console.log("Connection Established");
});

app.post("/createPlayerValorant", (req, res) => {
    let playerObject = {
        fullName: req.body.fullName,
        RegistrationNumber: req.body.RegistrationNumber,
        VitMail: req.body.VitMail,
        ValorantRank: req.body.rank,
        ValorantId: req.body.gameId,
        discord: req.body.discord,
        phoneNumber: req.body.phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", ""),
        team: req.body.teamName,
    };

    ValorantTeam.exists({ name: req.body.teamName }, (err, exists) => {
        if (exists) {
            ValorantPlayer.create(playerObject)
                .then((player) => {
                    ValorantTeam.findOne({ name: req.body.teamName }).then(
                        (team) => {
                            team.players.push(player._id);
                            team.save();
                            res.send("Player created");
                        }
                    );
                })
                .catch((error) => res.send(error.message));
        } else {
            res.send("There is not team with that name");
        }
    });
});

app.post("/ValorantCreateTeam", (req, res) => {
    let playerObject = {
        fullName: req.body.fullName,
        RegistrationNumber: req.body.RegistrationNumber,
        VitMail: req.body.VitMail,
        ValorantRank: req.body.rank,
        ValorantId: req.body.gameId,
        discord: req.body.discord,
        phoneNumber: req.body.phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", ""),
        team: req.body.teamName,
    };

    ValorantTeam.exists({ name: req.body.teamName }, (err, exists) => {
        if (!exists) {
            ValorantPlayer.create(playerObject)
                .then((player) => {
                    let teamObject = {
                        name: req.body.teamName,
                        Leader: player._id,
                        players: [player._id],
                    };
                    ValorantTeam.create(teamObject)
                        .then(() => res.send("Team created"))
                        .catch((error) => res.send(error.message));
                })
                .catch((error) => res.send(error));
        } else {
            res.send("Team already exists");
        }
    });
});

app.post("/teamInfo", (req, res) => {
    ValorantTeam.findOne({ name: req.body.teamName }).then((team) => {
        if (team) {
            ValorantPlayer.find()
                .where("_id")
                .in(team.players)
                .exec()
                .then((players) => {
                    res.render("TeamInfoResult", {
                        teamName: team.name,
                        players: players,
                    });
                });
        }
    });
});

app.get("/teamInfo", (req, res) => {
    res.render("TeamInfo");
});

app.get("/createPlayerValorant", (req, res) => {
    res.render("ValorantForm");
});

app.get("/ValorantCreateTeam", (req, res) => {
    res.render("ValorantCreateTeam");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(6969, () => {
    console.log("Listening on port 6969");
});
