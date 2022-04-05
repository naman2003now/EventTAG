const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const CSGOPlayer = require("./models/CSGOPlayer");
const CSGOTeam = require("./models/CSGOTeam");
const ValorantLobby = require("./models/ValorantLobby");
const ValorantPlayer = require("./models/ValorantPlayer");
const ValorantTeam = require("./models/ValorantTeam");
const app = express();
const cors = require("cors");

app.use(bodyparser());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public"));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use(
    "/resources",
    express.static(path.join(__dirname, "../public/resources"))
);

const uri =
    "mongodb+srv://naman2003now:paradrone@eventtag.wfz91.mongodb.net/GameEscape?retryWrites=true&w=majority";

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

    ValorantTeam.findOne({ name: req.body.teamName }, (err, team) => {
        if (team) {
            if (team.players.length < 5) {
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
                res.send("Team is full");
            }
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

app.post("/ValorantSolo", (req, res) => {
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
        team: "goingSolo",
    };
    ValorantPlayer.create(playerObject)
        .then((player) => {
            ValorantTeam.findOne({ name: "goingSolo" }).then((team) => {
                console.log(team);
                team.players.push(player._id);
                team.save();
                res.send("Player created");
            });
        })
        .catch((error) => res.send(error.message));
});

app.post("/createPlayerCSGO", (req, res) => {
    let playerObject = {
        fullName: req.body.fullName,
        RegistrationNumber: req.body.RegistrationNumber,
        VitMail: req.body.VitMail,
        CSGORank: req.body.rank,
        CSGOId: req.body.gameId,
        discord: req.body.discord,
        phoneNumber: req.body.phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", ""),
        team: req.body.teamName,
    };

    CSGOTeam.findOne({ name: req.body.teamName }, (err, team) => {
        if (team) {
            if (team.players.length < 5) {
                CSGOPlayer.create(playerObject)
                    .then((player) => {
                        CSGOTeam.findOne({ name: req.body.teamName }).then(
                            (team) => {
                                team.players.push(player._id);
                                team.save();
                                res.send("Player created");
                            }
                        );
                    })
                    .catch((error) => res.send(error.message));
            } else {
                res.send("Team Full");
            }
        } else {
            res.send("There is not team with that name");
        }
    });
});

app.post("/CSGOCreateTeam", (req, res) => {
    let playerObject = {
        fullName: req.body.fullName,
        RegistrationNumber: req.body.RegistrationNumber,
        VitMail: req.body.VitMail,
        CSGORank: req.body.rank,
        CSGOId: req.body.gameId,
        discord: req.body.discord,
        phoneNumber: req.body.phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", ""),
        team: req.body.teamName,
    };

    CSGOTeam.exists({ name: req.body.teamName }, (err, exists) => {
        if (!exists) {
            CSGOPlayer.create(playerObject)
                .then((player) => {
                    let teamObject = {
                        name: req.body.teamName,
                        Leader: player._id,
                        players: [player._id],
                    };
                    CSGOTeam.create(teamObject)
                        .then(() => res.send("Team created"))
                        .catch((error) => res.send(error.message));
                })
                .catch((error) => res.send(error));
        } else {
            res.send("Team already exists");
        }
    });
});

app.post("/CSGOSolo", (req, res) => {
    let playerObject = {
        fullName: req.body.fullName,
        RegistrationNumber: req.body.RegistrationNumber,
        VitMail: req.body.VitMail,
        CSGORank: req.body.rank,
        CSGOId: req.body.gameId,
        discord: req.body.discord,
        phoneNumber: req.body.phoneNumber
            .replaceAll("-", "")
            .replaceAll(" ", ""),
        team: "goingSolo",
    };

    CSGOPlayer.create(playerObject)
        .then((player) => {
            CSGOTeam.findOne({ name: "goingSolo" }).then((team) => {
                team.players.push(player._id);
                team.save();
                res.send("Player created");
            });
        })
        .catch((error) => res.send(error.message));
});

app.post("/teamInfoCSGO", (req, res) => {
    CSGOTeam.findOne({ name: req.body.teamName }).then((team) => {
        if (team.players) {
            CSGOPlayer.find()
                .where("_id")
                .in(team.players)
                .exec()
                .then((players) => {
                    res.render("TeamInfoCSGOResult", {
                        teamName: team.name,
                        players: players,
                        eligible: team.players.length == 5,
                    });
                });
        } else {
            res.send("There is no team with that name");
        }
    });
});
app.post("/teamInfoValorant", (req, res) => {
    ValorantTeam.findOne({ name: req.body.teamName }).then((team) => {
        if (team.players) {
            ValorantPlayer.find()
                .where("_id")
                .in(team.players)
                .exec()
                .then((players) => {
                    res.render("TeamInfoValorantResult", {
                        teamName: team.name,
                        players: players,
                        eligible: team.players.length == 5,
                    });
                });
        }
    });
});

app.post("/scheduleUploadValorant", (req, res) => {
    let scheduleObject = {
        time: req.body.time,
    };

    ValorantTeam.findOne({ name: req.body.team1Name }).then((team1) => {
        if (team1) {
            ValorantTeam.findOne({ name: req.body.team2Name }).then((team2) => {
                if (team2) {
                    scheduleObject.team1 = team1.name;
                    scheduleObject.team2 = team2.name;
                    ValorantLobby.create(scheduleObject)
                        .then(() => {
                            res.send("Schedule created");
                        })
                        .catch((error) => res.send(error.message));
                } else {
                    res.send("There is no team with the name of team 2");
                }
            });
        } else {
            res.send("These is no team with the name of team 1");
        }
    });
});

app.get("/schedule", (req, res) => {
    ValorantLobby.find().then((matches) => res.render("schedule", { matches }));
});

app.get("/teamInfoCSGO", (req, res) => {
    res.render("TeamInfoCSGO");
});
app.get("/teamInfoValorant", (req, res) => {
    res.render("TeamInfoValorant");
});

app.get("/mainPage", (req, res) => {
    res.render("mainPage");
});

app.get("/CSGOSolo", (req, res) => {
    res.render("CSGOSolo");
});
app.get("/createPlayerCSGO", (req, res) => {
    res.render("CSGOForm");
});

app.get("/CSGOCreateTeam", (req, res) => {
    res.render("CSGOCreateTeam");
});
app.get("/ValorantSolo", (req, res) => {
    res.render("ValorantSolo");
});
app.get("/createPlayerValorant", (req, res) => {
    res.render("ValorantForm");
});

app.get("/ValorantCreateTeam", (req, res) => {
    res.render("ValorantCreateTeam");
});

app.get("/", (req, res) => {
    res.render("mainPage");
});

app.get("/scheduleUploadValorant", (req, res) => {
    res.render("scheduleUploadValorant");
});

app.listen(process.env.PORT || 6969, () => {
    console.log("Listening on port " + (process.env.PORT || 6969));
});
