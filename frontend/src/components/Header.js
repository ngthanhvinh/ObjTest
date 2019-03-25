import React from 'react';
import "../bootstrap/css/bootstrap.css";
import "./header-view.css";

function Header() {
    return (
	<nav className="navbar sticky-top navbar-dark bg-dark" style={{marginBottom: "30px"}}>
		<div className="container">
			<span className="navbar-brand mb-0 h1">
				ObjTest
			</span>
			<span className="description text-inline text-right">
				A web app using the VGG16 pre-trained model to classify the object in images
			</span>
		</div>
	</nav>
    );
}

export default Header;
