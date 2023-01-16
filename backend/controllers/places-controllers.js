const HttpError = require("../models/http-errors");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
let DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: "20 W 34th St, New York, NY 10001",
		creator: "u1", //creator is the user id who created this place
	},
];

const getPlaceById = (req, res, next) => {
	const placeId = req.params.pid; // extract the place id from the request
	const place = DUMMY_PLACES.find((p) => {
		return p.id === placeId; // returns true if the place id matches the place id in the request, this in turn will store the place in the const place variable
	});

	if (!place) {
		// if the place is not found, then return a 404 error
		return next(
			new HttpError("Could not find a place for the provided id.", 404)
		);
	}
	// this wont run if the place is not found because of the return statement above
	res.json({ place: place }); // property: value
};

const getPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;
	// filter the dummy places array and return the places that match the user id, not used find as it will only return the first match
	const places = DUMMY_PLACES.filter((u) => {
		return u.creator === userId;
	});
	if (!places || places.length === 0) {
		return next(
			new HttpError("Could not find a places for the provided user id.", 404)
		);
	}

	// if the user id matches the creator id, then return the places
	res.json({ places: places });
};

const createPlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// if there are errors, then throw a new error
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	// extract the data from the request body by destructuring the object
	const { title, description, coordinates, address, creator } = req.body;
	const createdPlace = {
		id: uuid.v4(),
		title: title,
		description: description,
		location: coordinates,
		address: address,
		creator: creator,
	};
	DUMMY_PLACES.push(createdPlace); // add the new place to the dummy places array
	res.status(201).json({ place: createdPlace }); // 201 is the status code for created
};

const updatePlace = (req, res, next) => {
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
	const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
	const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
	updatedPlace.title = title;
	updatedPlace.description = description;
	DUMMY_PLACES[placeIndex] = updatedPlace;
	res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
	const placeId = req.params.pid;
	// if the place id is not found in the dummy places array, then throw an error
	if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
		throw new HttpError("Could not find a place for that id.", 404);
	}
	//selecting all the places that do not have the place id that is being deleted
	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
	res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
