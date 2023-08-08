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
	const email = "test@email.com"
	const {
		recipe_name,
		prep_time,
		cook_time,
		total_time,
		servings,
		category,
		source,
		ingredients,
		instructions,
		notes,
		tags
	} = await req.body;
	console.log(ingredients)
	try {
		await connectDB();
		const recipeAlreadyExists = await Recipe.findOne({ recipe_name });
		const findAuthor = await User.findOne({ email: email });
		console.log(recipeAlreadyExists);
		if (recipeAlreadyExists == null) {
			const newRecipe = new Recipe({
				recipe_name,
				author: findAuthor._id,
				prep_time,
				cook_time,
				total_time,
				servings,
				category,
				source,
				ingredients,
				instructions,
				notes,
				tags
			});
			await newRecipe.save();
			res.send(newRecipe);
		} else {
			res.send(`A recipe with the name ${recipe_name} already exists.`);
		}
	} catch (error) {
		res.send("Failed to create new recipe" + error);
	}
});

// get recipe 
router.get("/get", async (req, res) => {
	const { 
		recipe_name,

	 } = await req.body;
	try {
		await connectDB();
		const findRecipe = await Recipe.findOne({ recipe_name }).populate(
			"author"
		);
		if (findRecipe != null) {
			res.send(
				`The name of this recipe is ${findRecipe.recipe_name} and the author of this recipe is ${findRecipe.author.username}`
			);
		}
	} catch (error) {
		res.send("Failed to get recipe", error);
	}
});


module.exports = router;
