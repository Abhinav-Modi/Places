import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
const PlaceList = (props) => {
	//if there are no places, show a message
	if (props.items.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<button>Share Place</button>
				</Card>
			</div>
		);
	}
	//if there are places, show them
	return (
		<ul className="place-list">
			{props.items.map((place) => {
				return (
					<PlaceItem
						key={place.id}
						id={place.id}
						image={place.imageUrl}
						title={place.tite}
						description={place.description}
						creatorId={place.creator}
						coordinates={place.location}
					/>
				);
			})}
		</ul>
	);
};

export default PlaceList;
