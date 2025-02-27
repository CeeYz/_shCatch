const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		image: Buffer,
		name: String,
		price: Number,
		discount: {
			type: Number,
			default: 0,
		},
		bgColor: String,
		textColor: String,
		panelColor: String,
	},
	{ timestamp: true }
);

module.exports = mongoose.model("product", productSchema);
