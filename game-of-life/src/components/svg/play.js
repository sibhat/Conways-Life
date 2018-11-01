import React from "react";
const PlaySvg = ({ playing }) => {
	let className = playing ? "cls-1 disable" : "cls-1";
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
			<g id="Artboard_1" data-name="Artboard 1">
				<path
					className={className}
					d="M11,24.5A14.5,14.5,0,1,0,25.5,10,14.516,14.516,0,0,0,11,24.5Zm1.16,0A13.34,13.34,0,1,1,25.5,37.84,13.355,13.355,0,0,1,12.16,24.5Z"
				/>
				<path className={className} d="M34,24.5L20,17V32l14-7.5" />
			</g>
		</svg>
	);
};

export default PlaySvg;
