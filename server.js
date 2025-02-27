require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db.connection");
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const flash = require("connect-flash");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: parseInt(process.env.SESSION_MAX_AGE),
			secure: true,
			httpOnly: true,
		},
	})
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(4500, () => console.log("Server running on 4500"));
