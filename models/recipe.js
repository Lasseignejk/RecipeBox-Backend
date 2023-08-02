const {Schema, model, models} = require("mongoose")

const RecipeSchema = new Schema({
    recipe_name: {
        type: String,
        required: [true, "Please enter a name for your recipe."],
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "userId required"]
    }

})

const Recipe = models.Recipe || model("Recipe", RecipeSchema)

module.exports = Recipe