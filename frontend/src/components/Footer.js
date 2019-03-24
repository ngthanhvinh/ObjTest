import React from 'react';
import "../bootstrap/css/bootstrap.css";
import "./footer-view.css"

function Footer() {
    return (
	<div>
		<div style={{marginBottom: "50px"}} />
		<div className="footer jumbotron jumbotron-fluid bg-dark">
			<div className="container text-center">
				<p>Made with 
					<span role="img"> ❤ </span>
					by <a href="https://github.com/ngthanhvinh2000"><strong>Vinh Nguyen</strong></a>
				</p>
			</div>
		</div>
	</div>
    );
}

export default Footer;
