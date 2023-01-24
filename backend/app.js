const express = require("express");
const HttpError = require("./models/http-errors");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const app = express();
//extract the json data from the request body and add it to the request object
app.use(express.json());
//add the places routes to the app
app.use("/api/places", placesRoutes);
//add the users routes to the app
app.use("/api/users", usersRoutes);

//handling non defined routes error
app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});
//special error handling middleware
app.use((error, req, res, next) => {
	// if there is a header then the response has already been sent
	if (res.headerSent) {
		return next(error);
	}
	// if there is no header then send the error
	res
		.status(error.code || 500)
		.json({ message: error.message || "An unknown error occurred!" });
});

//connect to the database
mongoose.set("strictQuery", true);
mongoose
	.connect(
		"mongodb+srv://Abhinav:hmfo9tekUXzF32t5@cluster0.w5h1eds.mongodb.net/wanderings?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Connected to database!");
		app.listen(5000);
	})
	.catch((err) => {
		console.log(err);
	});
