const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const connectDB = require("../database");
const User = require("../models/user");
const Recipe = require("../models/recipe")

// MIDDLEWARE
router.use(cors());
router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
router.use(bodyParser.json());

// new recipe
router.post("/new", async (req, res) => {
	const { name, email } = await req.body;
	try {
		await connectDB();
		const recipeAlreadyExists = await Recipe.findOne({ name: name });
		const findAuthor = await User.findOne({ email: email });
		console.log(recipeAlreadyExists);
		if (recipeAlreadyExists == null) {
			const newRecipe = new Recipe({
				name: name,
				author: findAuthor._id,
			});
			await newRecipe.save();
			res.send(newRecipe);
		} else {
			res.send(`A recipe with the name ${name} already exists.`);
		}
	} catch (error) {
		res.send("Failed to create new recipe" + error);
	}
});

// get recipe 
router.get("/get", async (req, res) => {
	const { name } = await req.body;
	try {
		await connectDB();
		const findRecipe = await Recipe.findOne({ name: name }).populate(
			"author"
		);
		if (findRecipe != null) {
			res.send(
				`The name of this recipe is ${findRecipe.name} and the author of this recipe is ${findRecipe.author.username}`
			);
		}
	} catch (error) {
		res.send("Failed to get recipe", error);
	}
});


module.exports = router;
