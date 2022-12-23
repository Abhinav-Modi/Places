import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
const NavLinks = () => {
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/">All Users</NavLink>
			</li>
			<li>
				<NavLink to="/u1/places">My Places</NavLink>
			</li>
			<li>
				<NavLink to="/places/new">Add New Place</NavLink>
			</li>
			<li>
				<NavLink to="/auth">Authenticate</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
