import React, { Component } from "react";
import Cell from "./Cell";
import "./main.css";
class Canvas extends Component {
	componentWillUnmount() {
		this.continueAnimation = false;
	}

	render() {
		let table = this.props.cells.map((row, i) =>
			row.map((cell, x) => {
				return (
					<Cell
						key={`${x}-${i}`}
						onclick={this.props.onclick}
						cell={cell}
						row={i}
						col={x}
					/>
				);
			})
		);
		return (
			<div
				className="canvas"
				style={{ width: this.props.row * this.props.row * 2 }}
			>
				{table}
			</div>
		);
	}
}

export default Canvas;
