import React, { Component } from "react";
import "./main.css";
class Cell extends Component {
	componentDidMount() {}

	render() {
		let className = this.props.cell ? "cell on" : "cell off";
		let { row, col } = this.props;
		return (
			<div
				onClick={e => this.props.onclick(row, col)}
				className={className}
			>
				{""}
			</div>
		);
	}
}

export default Cell;
