const mongoose = require("mongoose");

try {
	mongoose.connect(`${process.env.DB_URL}/_shCatch`);
	console.log("Connected to _shCatch's MongoDB server successfully");
} catch (err) {
	console.log(err);
}

module.exports = mongoose.connection;
