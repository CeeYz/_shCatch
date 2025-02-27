const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product.model");

router.get("/", (req, res) => {
	let error = req.flash("error");
	let message = req.flash("message");
	res.render("index", { message, error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
	let products = await productModel.find();
	res.render("shop", { products });
});

router.get("/logout", isLoggedin, (req, res) => {
	res.render("shop");
});

router.get("/cart", (req, res) => {
	res.render("cart");
});

module.exports = router;
