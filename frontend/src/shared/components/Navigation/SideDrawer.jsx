import React from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";
import { CSSTransition } from "react-transition-group";
const SideDrawer = (props) => {
	//using a portal for seo purposes adn best practices
	// the portal will render the content in the div with id="drawer-hook" in index.html
	const content = (
		<CSSTransition
			in={props.show}
			timeout={300}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-drawer" onClick={props.onClick}>
				{props.children}
			</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
