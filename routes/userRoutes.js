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
		console.log(alreadyExists)
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


module.exports = router;