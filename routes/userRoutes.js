const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const connectDB = require("../database");
const User = require("../models/user");

// MIDDLEWARE
router.use(cors());
router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
router.use(bodyParser.json());

// new user
router.post("/new", async (req,res) => {
    const { email, username } = await req.body;

	try {
		await connectDB();
		const alreadyExists = await User.findOne({email: email})
		if (alreadyExists == null) {
		const newUser = new User({
			email: email,
			username: username,
		});
		await newUser.save();
		res.send(newUser);
		} else {
		    res.send(`A user with the email ${email} already exists.`)
		}
	} catch (error) {
		res.send(error);
	}
})

// check if user exists. if not: add them. if yes: update them.
router.post("/check", async (req, res) => {
	const { email, username, nickname, picture } = await req.body;

	try {
		await connectDB();
		const alreadyExists = await User.findOne({ email: email });
		if (alreadyExists == null) {
			const newUser = new User({
				email,
				username,
				nickname,
				picture
			});
			await newUser.save();
			res.send(newUser);
		} else {
			const updateUser = await User.findOneAndUpdate({email: email}, {username, nickname, picture}, {new: true})

			res.send(updateUser)
		}
	} catch (error) {
		res.send(error);
	}
});


module.exports = router;