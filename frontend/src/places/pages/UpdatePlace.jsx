import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=612x612&w=0&k=20&c=RkcUiEmZYarBPnQW8qm7GUJEegE24Molcl2ijMlY3kQ=",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: " State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=612x612&w=0&k=20&c=RkcUiEmZYarBPnQW8qm7GUJEegE24Molcl2ijMlY3kQ=",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u2",
	},
];
const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);
	const placeId = useParams().placeId;

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
	useEffect(() => {
		if (identifiedPlace) {
			setFormData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}

		setIsLoading(false);
	}, [setFormData, identifiedPlace]);

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs); // send this to the backend!
	};
	if (!identifiedPlace) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="center">
				<h2>Loading...</h2>
			</div>
		);
	} // this is to avoid the error of formState.inputs.title.value is undefined
	return (
		formState.inputs.title.value && (
			<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={() => {}}
					initialValue={formState.inputs.title.value}
					initialValid={formState.inputs.title.isValid}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
					initialValue={formState.inputs.description.value}
					initialValid={formState.inputs.description.isValid}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					UPDATE PLACE
				</Button>
			</form>
		)
	);
};

export default UpdatePlace;
