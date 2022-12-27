import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./users/pages/Users";
import Places from "./places/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Routes>
					<Route exact path="/" element={<Users />} />
					{/* dynamic route to link to user's places defind in useritem.jsx */}
					<Route exact path="/:userId/places" element={<UserPlaces />} />
					<Route exact path="/places" element={<Places />} />
					<Route exact path="/places/new" element={<NewPlace />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;
