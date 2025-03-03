const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
		},
		email: String,
		password: String,
		cart: {
			type: Array,
			default: [],
		},
		contact: Number,
		orders: {
			type: Array,
			default: [],
		},
		picture: String,
	},
	{ timestamp: true }
);

module.exports = mongoose.model("user", userSchema);
