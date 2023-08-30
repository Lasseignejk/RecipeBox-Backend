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
		tags,
		img,
		_id
	} = await req.body;
	try {
		await connectDB();
		const recipeAlreadyExists = await Recipe.findOne({ recipe_name });

		const findAuthor = await User.findOne({ _id });

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
				tags,
				img
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

// get recipe, return author
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

// get one recipe
router.get("/getOne/:id", async (req, res) => {
	const id = req.params.id;
	console.log(id)
	try {
		await connectDB();
		const findRecipe = await Recipe.findOne({ _id: id})
		if (findRecipe != null) {
			console.log("Recipe Found")
			res.send(findRecipe);
		}
	} catch (error) {
		res.send(error);
	}
});

//update one recipe 
router.post("/update/:id", async (req,res) => {
	const id = req.params.id;
	const {
		recipe_name, prep_time, cook_time, total_time, servings, category, source, ingredients, instructions, img, notes, tags, _id, author
	} = await req.body
	try {
		await connectDB();
		const findAuthor = await User.findOne({_id: author})

		if (findAuthor != null) {
			const filter = {_id}
			const update = {recipe_name, prep_time, cook_time, total_time, servings, category, source, ingredients, instructions, notes, tags, img}
			const updatedRecipe = await Recipe.findOneAndUpdate(filter, update, {new: true})
			res.send(updatedRecipe)
		}
	} catch (error) {
		res.send(error)
	}

})

// find the user's recipes
router.get("/user/:id", async (req,res) => {
	const id = req.params.id
	try {
		await connectDB();
		const userRecipes = await Recipe.find({author: id}).exec()
		if (userRecipes != null) {
			res.send(userRecipes)
		}
	} catch (error) {
		res.send("Failed to fetch all recipes", error)
	}
})


module.exports = router;
