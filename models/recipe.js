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
    },
    prep_time: {
        type: String,
    },
    cook_time: {
        type: String,
    },
    img: {
        type: String,
    },
    total_time: {
        type: String,
    },
    servings: {
        type: String,
    },
    category: {
        type: String,
    },
    source: {
        type: String,
        required: [true, "Please enter in a source for the recipe."]
    },
    ingredients: [{
        ingredient_name: {type: String},
        ingredient_amount: {type: String},
        ingredient_measurement: {type: String},
        ingredient_directions: {type: String},
        ingredient_total: {type: String},
        ingredient_category: {type: String},
    }],
    instructions: [{
        step: {type: Number},
        instruction: {type: String}
    }],
    notes: {type: String},
    tags:[{type: String}],
})

const Recipe = models.Recipe || model("Recipe", RecipeSchema)

module.exports = Recipe