import React from "react";
import Button from "./Button";
const Presets = ({ seed, showPreset, handlePresets }) => {
	return (
		<div className="Presets">
			<div onClick={handlePresets} className="Presets__heading">
				Presets
			</div>
			{showPreset && (
				<React.Fragment>
					<Button text="Preset 1" onclick={seed} preset />
					<Button text="Preset 2" preset />
					<Button text="Preset 3" preset />
					<Button text="Preset 4" preset />
				</React.Fragment>
			)}
		</div>
	);
};

export default Presets;
