const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3060;
const connectDB = require("./database")
const userRoutes = require("./routes/userRoutes")
const recipeRoutes = require("./routes/recipeRoutes")
const User = require("./models/user");
const Recipe = require("./models/recipe");

app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use("/user", userRoutes)
app.use("/recipe", recipeRoutes)




// app.get("/getRecipe", async (req,res) => {
//     const {name} = await req.body
//     try {
//         await connectDB();
//         const findRecipe = await Recipe.findOne({name:name}).populate('author');
//         if (findRecipe != null) {
//             res.send(`The author of this recipe is ${findRecipe.author.username}`)
//         }
//     } catch (error) {
//         res.send("Failed to get recipe", error)
//     }
// })


app.listen(PORT, console.log(`Server started on port ${PORT}`));