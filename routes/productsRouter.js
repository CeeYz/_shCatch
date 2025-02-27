const express = require("express");
const { upload } = require("../config/multer.config");
const router = express.Router();
const productModel = require("../models/product.model");

router.get("/", (req, res) => res.send("Hello Products!!!"));

router.post("/create", upload.single("image"), async (req, res) => {
	try {
		let { name, price, discount, bgColor, panelColor, textColor } = req.body;

		let createdProduct = await productModel.create({
			image: req.file.buffer,
			name,
			price,
			discount,
			bgColor,
			panelColor,
			textColor,
		});

		req.flash("success", "Product created successfully");
		res.redirect("/owners/admin");
		res.status(201).send(createdProduct);
	} catch (error) {
		res.status(504).send(error.message);
	}
});

module.exports = router;
