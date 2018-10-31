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
		continueAnimation: false
	};
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
				requestAnimationFrame(() => this.game());
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
	stopGame = () => {
		this.setState({ continueAnimation: false });
	};
	playGame = () => {
		this.setState({ continueAnimation: true });
		requestAnimationFrame(() => this.game());
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
			cellArry: buffer
		});
	};
	game() {
		if (this.state.continueAnimation) {
			requestAnimationFrame(() => this.game());
		}
		let buffer = this.deepCopyArry(this.state.cellArry);
		buffer.forEach((row, i) => {
			row.forEach((cell, x) => {
				let count = this.count(buffer, i, x);
				console.log("game cout is", count);
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
	clickHandlerForCell = (row, col) => {
		let buffer = this.deepCopyArry(this.state.cellArry);
		buffer[row][col] = !buffer[row][col];
		this.setState({ cellArry: buffer });
	};
	deepCopyArry = arry => {
		var newArray = arry.map(function(arr) {
			return arr.slice();
		});
		return newArray;
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
						<Button text="Pause" />
						<Button text="stop" onclick={this.stopGame} />
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
