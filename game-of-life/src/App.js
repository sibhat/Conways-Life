import React, { Component } from "react";
import Canvas from "./components/Bord";
import Button from "./components/Button";
import "./App.css";

class App extends Component {
	state = {
		generation: 0,
		row: 10,
		col: 10,
		cellArry: [],
		continueAnimation: false,
		range: 1,
		speed: 1000,
		seeded: false
	};
	setTimeoutId = 0;
	componentDidMount() {
		this.setState(
			(prevState, prevProps) => {
				return {
					cellArry: new Array(this.state.row)
						.fill()
						.map(item => new Array(this.state.col).fill(false))
				};
			},
			() => {
				this.seed();
				requestAnimationFrame(time => this.game(time));
			}
		);
	}
	count = (arry, row, col) => {
		let count = 0;

		// row = (row + this.state.row) % this.state.row;
		// col = (col + this.state.col) % this.state.col;

		if (
			arry[(row - 1 + this.state.row) % this.state.row][
				(col - 1 + this.state.col) % this.state.col
			]
		) {
			count++;
		}
		if (arry[(row - 1 + this.state.row) % this.state.row][col]) {
			count++;
		}
		if (
			arry[(row - 1 + this.state.row) % this.state.row][
				(col + 1 + this.state.col) % this.state.col
			]
		) {
			count++;
		}
		if (arry[row][(col - 1 + this.state.col) % this.state.col]) {
			count++;
		}
		if (arry[row][(col + 1 + this.state.col) % this.state.col]) {
			count++;
		}
		if (
			arry[(row + 1 + this.state.row) % this.state.row][
				(col - 1 + this.state.col) % this.state.col
			]
		) {
			count++;
		}
		if (arry[(row + 1 + this.state.row) % this.state.row][col]) {
			count++;
		}
		if (
			arry[(row + 1 + this.state.row) % this.state.row][
				(col + 1 + this.state.col) % this.state.col
			]
		) {
			count++;
		}

		return count;
	};
	pauseGame = () => {
		this.setState({ continueAnimation: false });
	};
	stopGame = () => {
		this.setState({
			cellArry: new Array(this.state.row)
				.fill()
				.map(item => new Array(this.state.col).fill(false)),
			generation: 0,
			continueAnimation: false,
			seeded: false
		});
	};
	playGame = () => {
		if (!this.state.seeded) {
			return;
		}
		this.setState({ continueAnimation: true });
		requestAnimationFrame(timestamp => this.game(timestamp));
	};
	seed = () => {
		let buffer = this.deepCopyArry(this.state.cellArry);
		buffer.forEach((row, i) => {
			row.forEach((cell, x) => {
				let randomNumber = Math.floor(Math.random() * 4);
				if (randomNumber === 1) {
					buffer[i][x] = true;
				} else {
					buffer[i][x] = false;
				}
			});
		});
		this.setState({
			cellArry: buffer,
			generation: 0,
			seeded: true
		});
	};
	start = null;
	game(timestamp) {
		if (this.state.continueAnimation) {
			requestAnimationFrame(timestamp => this.game(timestamp));
			if (this.start === null) {
				this.start = timestamp - 30; // milliseconds
			}
			let progress = timestamp - this.start;

			if (progress > this.state.speed / this.state.range / 2) {
				this.start = timestamp;
				let buffer = this.deepCopyArry(this.state.cellArry);
				buffer.forEach((row, i) => {
					row.forEach((cell, x) => {
						let count = this.count(buffer, i, x);
						if (count === 2) {
							buffer[i][x] = true;
						} else if (count === 3) {
							buffer[i][x] = true;
						} else {
							buffer[i][x] = false;
						}
					});
				});
				this.setState({
					cellArry: buffer,
					generation: this.state.generation + 1
				});
			}
		}
	}
	clickHandlerForCell = (row, col) => {
		let buffer = this.deepCopyArry(this.state.cellArry);
		buffer[row][col] = !buffer[row][col];
		this.setState({ cellArry: buffer, seeded: true });
	};
	componentWillUnmount() {
		// Stop animating
		this.continueAnimation = false;
		clearInterval(this.setTimeoutId);
	}
	deepCopyArry = arry => {
		var newArray = arry.map(function(arr) {
			return arr.slice();
		});
		return newArray;
	};
	handleChange = e => {
		this.setState({
			range: e.target.value
		});
	};
	render() {
		return (
			<div className="App">
				<div className="main">
					<h1>Generation {this.state.generation}</h1>
					<Canvas
						cells={this.state.cellArry}
						row={this.state.row}
						col={this.state.col}
						generation={this.state.generation}
						onclick={this.clickHandlerForCell}
					/>
					<div className="controles">
						<Button text="Play" onclick={this.playGame} />
						<Button text="Pause" onclick={this.pauseGame} />
						<Button text="stop" onclick={this.stopGame} />
						<label htmlFor="range">Speed: {this.state.range}</label>
						<input
							type="range"
							name="range"
							min="0"
							max="5"
							value={this.state.range}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="Presets">
					<Button text="Preset 1" onclick={this.seed} />
					<Button text="Preset 2" />
					<Button text="Preset 3" />
					<Button text="Preset 4" />
				</div>
			</div>
		);
	}
}

export default App;
