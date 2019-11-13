import React, { Component } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.timer = null;
		const heroCoords = null;
		const heroPosition = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => {
				this.setState({ heroCoords: gestureState });
				this.Move();
			},
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderRelease: (event, gestureState) => {
				this.clearTimer();
			}
		});

		// Bindings
		this.Move = this.Move.bind(this);
		this.clearTimer = this.clearTimer.bind(this);

		this.state = {
			panResponder,
			heroCoords,
			heroPosition
		};
	}

	// Functions =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	clearTimer() {
		clearTimeout(this.timer);
		console.log('Clearing Timer');
	}

	Move() {
		if (this.isInCircle()) {
			var heroX = (Number(JSON.stringify(this.state.heroPosition.x))) + Math.round(this.state.heroCoords.dx);
			var heroY = (Number(JSON.stringify(this.state.heroPosition.y))) + Math.round(this.state.heroCoords.dy);
			
			//set the room boundaries
			
			Animated.spring(this.state.heroPosition, {toValue: {x: heroX, y: heroY}, }).start();
		} else {
			//console.log('Out of circle.');
		}
		this.timer = setTimeout(this.Move, 120);
	}

	isInCircle = () => {
		// Pythagoras Theory - (x-x1)2 + (y-y1)2 = r2
		var xCenter = 0;
		var yCenter = 0;
		var dx,
			dy = 0;
		if (this.state.heroCoords) {
			dx = this.state.heroCoords.dx;
			dy = this.state.heroCoords.dy;
			// console.log('x :', dx);
			// console.log('y :', dy);
		}
		var d = Math.sqrt(Math.pow(dx - xCenter, 2) + Math.pow(dy - yCenter, 2));
		//console.log('direction : ' + d);
		if (d < 100) {
			return true;
		} else {
			return false;
		}
	};

	// Render =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	render() {
		let panHandlers = this.state.panResponder.panHandlers;
		return (
			<View style={styles.container}>
				<View style={[ styles.top ]}>
					<Animated.View style={[ styles.hero, this.state.heroPosition.getLayout() ]} />
					{/*  <Text> {this.state.heroPosition} </Text> */}
				</View>
				<View style={[ styles.bottom ]}>
					<View style={[ styles.dPad ]} {...panHandlers} />
				</View>
			</View>
		);
	}
}

// Styles =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	dPad: {
		height: 200,
		width: 200,
		borderColor: 'black',
		borderRadius: 100,
		borderWidth: 100
	},
	hero: {
		height: 80,
		width: 80,
		borderColor: 'blue',
		borderRadius: 40,
		backgroundColor: 'green'
	},
	top: {
		flex: 3,
		backgroundColor: 'gold'
	},
	bottom: {
		flex: 1,
		backgroundColor: 'powderblue'
	}
});