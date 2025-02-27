const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
	try {
		let { fullname, email, password } = req.body;

		let user = await userModel.findOne({ email: email });
		if (user) return res.status(401).send("You already have an account, please login.");

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) return err.message;
				else {
					let createdUser = await userModel.create({
						fullname,
						email,
						password: hash,
					});

					const token = jsontoken(user);
					res.cookie("token", token);
					req.flash("message", "Account created, you can login now");
					res.redirect("/");
				}
			});
		});
	} catch (error) {
		res.send(error.message);
	}
};

const loginUser = async (req, res) => {
	let { email, password } = req.body;
	let existingUser = await userModel.findOne({ email: email });

	if (existingUser) return res.send("Email or password not found");

	bcrypt.compare(password, existingUser.password, (err, result) => {
		res.send(result);
		if (result) {
			let token = generateToken(user);
			res.cookie("token", token);
		} else return res.send("Email or password not found");
	});
};

const logoutUser = (req, res) => {
	res.cookie("token", "");
	res.redirect("/");
};

module.exports.registerUser = registerUser;
module.exports.login = loginUser;
module.exports.logout = logoutUser;
