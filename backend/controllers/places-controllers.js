const HttpError = require("../models/http-errors");

const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/users");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
	const placeId = req.params.pid; // extract the place id from the request
	let place;
	try {
		place = await Place.findById(placeId); // find the place by the id
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find a place.",
			500
		);
		return next(error);
	}

	if (!place) {
		// if the place is not found, then return a 404 error
		return next(
			new HttpError("Could not find a place for the provided id.", 404)
		);
	}
	// this wont run if the place is not found because of the return statement above
	res.json({ place: place.toObject({ getters: true }) }); // property: value
};

const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	// filter the dummy places array and return the places that match the user id, not used find as it will only return the first match
	let places;
	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching places failed, please try again later.",
			500
		);
		return next(error);
	}
	if (!places || places.length === 0) {
		return next(
			new HttpError("Could not find a places for the provided user id.", 404)
		);
	}

	// if the user id matches the creator id, then return the places
	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	});
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// if there are errors, then throw a new error
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	// extract the data from the request body by destructuring the object
	const { title, description, address, creator } = req.body;
	let coordinates;
	try {
		// get the coordinates from the address
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}
	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image:
			"https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
		creator,
	});
	let user;
	try {
		user = await User.findById(creator); // check if the user exists
	} catch (err) {
		const error = new HttpError(
			"Creating place failed, please try again.",
			500
		);
		return next(error);
	}
	if (!user) {
		const error = new HttpError("Could not find user for provided id.", 404);
		return next(error);
	}
	// save the place to the database
	try {
		// this is a mongoose method that will start a session and commit the transaction
		// if any of the below steps fail, then the transaction will be rolled back and the place will not be saved
		const session = await mongoose.startSession(); // start a session
		session.startTransaction(); // start a transaction
		await createdPlace.save({ session: session }); // save the place
		user.places.push(createdPlace); // push the place to the user
		await user.save({ session: session }); // save the user after pushing the place
		await session.commitTransaction(); // commit the transaction
	} catch (err) {
		const error = new HttpError(
			"Creating place failed, please try again.",
			500
		);
		return next(error);
	}
	res.status(201).json({ place: createdPlace }); // 201 is the status code for created
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// if there are errors, then throw a new error
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	const { title, description } = req.body;
	const placeId = req.params.pid;
	// using the spread operator to copy the place object and then updating the title and description
	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update place.",
			500
		);
		return next(error);
	}
	place.title = title;
	place.description = description;
	try {
		await place.save();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update place.",
			500
		);
		return next(error);
	}
	res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	const placeId = req.params.pid;
	let place;
	try {
		place = await Place.findById(placeId).populate("creator"); //populate allows to go from one model to another
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place.",
			500
		);
		return next(error);
	}
	if (!place) {
		const error = new HttpError("Could not find place for this id.", 404);
		return next(error);
	}
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await place.remove({ session: session });
		place.creator.places.pull(place);
		await place.creator.save({ session: session });
		await session.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place.",
			500
		);
		return next(error);
	}
	res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
