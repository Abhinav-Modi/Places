import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./users/pages/Users";
import Places from "./places/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Routes>
					<Route exact path="/" element={<Users />} />
					<Route path="/places" element={<Places />} />
					<Route path="/places/new" element={<NewPlace />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;
