const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const path = require("path")
const Player = require("./models/Player")
const app = express()

app.use(bodyparser())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../public"))
app.use("/css", express.static(path.join(__dirname, "../public/css")))

const uri =
	"mongodb+srv://paradrone:01000101@eventtag.wfz91.mongodb.net/Tournament?retryWrites=true&w=majority"

mongoose.connect(uri, () => {
	console.log("Connection Established")
})

app.post("/", (req, res) => {
	let playerObject = {
		fullName: req.body.fullName,
		RegistrationNumber: req.body.RegistrationNumber,
		VitMail: req.body.VitMail,
		gameName: "Valorant",
		rank: req.body.rank,
		gameId: req.body.gameId,
		discord: req.body.discord,
		phoneNumber: req.body.phoneNumber,
	}
	Player.exists({RegistrationNumber: req.body.RegistrationNumber}).then(
		(player) => {
			if (player) {
				res.send("Player already exists")
			} else {
				Player.create(playerObject)
					.then(() => res.send("Player created"))
					.catch((error) => res.send(error))
			}
		}
	)
})

app.get("/", (req, res) => {
	res.render("Form")
})

app.listen(6969, () => {
	console.log("Listening on port 6969")
})
