import React, { Component } from "react";
import Canvas from "./components/Bord";
import Button from "./components/Button";
import "./App.css";
import Presets from "./components/Presets";
import Rules from "./components/Rules";
import Landing from "./components/svg/Landing";
import anime from "animejs";

class App extends Component {
	state = {
		generation: 0,
		row: 10,
		col: 10,
		cellArry: [],
		continueAnimation: false,
		range: 1,
		speed: 1000,
		seeded: false,
		showPreset: false,
		showRuls: false,
		playing: false,
		landingPage: true
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
		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {
				let rows = (row + x + this.state.row) % this.state.row;
				let cols = (col + y + this.state.col) % this.state.col;
				if (arry[rows][cols]) count++;
			}
		}
		count -= 1;
		return count;
	};
	pauseGame = () => {
		this.setState({ continueAnimation: false, playing: false });
	};
	stopGame = () => {
		this.setState({
			cellArry: new Array(this.state.row)
				.fill()
				.map(item => new Array(this.state.col).fill(false)),
			generation: 0,
			continueAnimation: false,
			seeded: false,
			playing: false
		});
	};
	playGame = () => {
		if (!this.state.seeded || this.state.playing) {
			return;
		}
		this.setState({ continueAnimation: !this.state.continueAnimation });
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

			if (progress > this.state.speed / this.state.range / 4) {
				this.start = timestamp;
				let buffer = this.deepCopyArry(this.state.cellArry);
				buffer.forEach((row, i) => {
					row.forEach((cell, x) => {
						let count = this.count(buffer, i, x);
						if (buffer[i][x] && count === 2) {
							buffer[i][x] = true; //stasis
						} else if (count === 3) {
							buffer[i][x] = true; //birth
						} else if (count > 3 || count < 2) {
							buffer[i][x] = false; //die
						}
					});
				});
				this.setState({
					cellArry: buffer,
					generation: this.state.generation + 1,
					playing: true
				});
			}
		}
	}
	clickHandlerForCell = (row, col) => {
		if (this.state.playing) {
			return;
		}
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
	handlePresets = e => {
		this.setState({ showPreset: !this.state.showPreset });
	};
	handleRules = e => {
		this.setState({ showRuls: !this.state.showRuls });
	};
	landingPage = e => {
		var timeline = anime.timeline({
			autoplay: true,
			direction: "alternate",
			loop: false
		});
		timeline.add({
			targets: ".landing",
			d: [
				{
					value:
						"M8,9C458.568,82.846,1016.49-6.57,1125,113c173.68,199.406,113.33,586.667,170,880L9,990"
				},
				{
					value:
						"M8,9C62.878,218.835,164.977,409.854,310,567c253.625,274.826,612.45,418.593,985,426L9,990"
				}
			],
			opacity: 0,
			duration: 1000,
			easing: "easeInQuad"
		});
		timeline.finished.then(k => {
			anime({
				targets: ".landing",
				opacity: 0,
				translateX: -500,
				easing: "easeInQuart",
				complete: () => {
					this.setState({ landingPage: false });
				}
			});
		});
	};
	render() {
		return (
			<div className="App">
				<nav className="nav">Home</nav>
				{this.state.landingPage && (
					<Landing landingPage={this.landingPage} />
				)}
				<div className="main">
					<div className="grid">
						<Canvas
							cells={this.state.cellArry}
							row={this.state.row}
							col={this.state.col}
							generation={this.state.generation}
							onclick={this.clickHandlerForCell}
						/>
						<div className="controles">
							<Button
								onclick={this.playGame}
								play
								playing={this.state.playing}
							/>
							<Button onclick={this.pauseGame} pause />
							<Button onclick={this.stopGame} stop />
							<div>
								<label htmlFor="range">
									Speed: {this.state.range}
								</label>
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
					</div>
					<div className="option">
						<Presets
							seed={this.seed}
							showPreset={this.state.showPreset}
							handlePresets={this.handlePresets}
						/>
						<Rules
							seed={this.seed}
							showPreset={this.state.showRuls}
							handlePresets={this.handleRules}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
