import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./users/pages/Users";
import Places from "./places/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);
	let routes;
	if (isLoggedIn) {
		routes = (
			<Routes>
				<Route exact path="/" element={<Users />} />
				{/* dynamic route to link to user's places defind in useritem.jsx */}
				<Route exact path="/:userId/places" element={<UserPlaces />} />
				<Route exact path="/places" element={<Places />} />
				<Route exact path="/places/new" element={<NewPlace />} />
				<Route exact path="/places/:placeId" element={<UpdatePlace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route exact path="/" element={<Users />} />
				{/* dynamic route to link to user's places defind in useritem.jsx */}
				<Route exact path="/:userId/places" element={<UserPlaces />} />
				<Route exact path="/places" element={<Places />} />
				<Route exact path="/auth" element={<Auth />} />
			</Routes>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
