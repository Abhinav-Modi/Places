import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import "./Map.css";
import {
	interaction,
	layer,
	custom,
	control,
	Interactions,
	Overlays,
	Controls,
	Map,
	Layers,
	Overlay,
	Util,
} from "react-openlayers";
const mapContainerStyle = {
	width: "100vw",
	height: "100vh",
};
const center = {
	lat: 31.968599,
	lng: -99.90181,
};

export default function Maps(props) {
	const { isLoaded, loadError } = useLoadScript({
		// Uncomment the line below and add your API key
		// googleMapsApiKey: '<Your API Key>',
	});

	if (loadError) return "Error loading Maps";
	if (!isLoaded) return "Loading Maps";

	return (
		<Map
			view={{ center: [props.center.lat, props.center.lng], zoom: props.zoom }}
			className="map"
		>
			<Layers>
				<layer.Tile />
			</Layers>
		</Map>
	);
}
