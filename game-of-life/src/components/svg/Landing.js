import React from "react";
const Landing = ({ landingPage }) => {
	return (
		<div onClick={landingPage} id="landing">
			<div className="center">
				<h1>Welcome to Conway's "Game of Life"</h1>
				<span>Click anywhere to start the game</span>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
				<g id="Artboard_1" data-name="Artboard 1">
					<path className="landing" d="M8,9L1295,8V993L9,990" />
				</g>
			</svg>
		</div>
	);
};

export default Landing;
