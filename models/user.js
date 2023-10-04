const {Schema, model, models} = require("mongoose")

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
	},
	nickname: {
		type: String,
	},
    picture: {
        type: String,
    },
	tags: {
		type: Array,
	}
});

const User = models.User || model("User", UserSchema)

module.exports = User