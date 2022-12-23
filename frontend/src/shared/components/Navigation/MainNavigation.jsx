import React, { useState } from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};
	// will close the drawer upon clicking a button on navigation menu
	//will also close the drawer upon clicking the backdrop
	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};
	return (
		<>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

			<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>

			<MainHeader>
				{/* this will be forwarded as a prop to MainHeader component using props.children */}
				<button
					className="main-navigation__menu-btn"
					onClick={openDrawerHandler}
				>
					<span />
					<span />
					<span />
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">Wanderins</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	);
};

export default MainNavigation;
