const express = require("express");
const router = express.Router();
const { registerUser, login, logout } = require("../controllers/auth.contoller");

router.get("/", (req, res) => res.send("Hello Users!!!"));

router.post("/register", registerUser);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
