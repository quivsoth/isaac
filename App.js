import React, { Component } from 'react';
import { StyleSheet,View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import RemoteControl from './RemoteControl';
import Constants from './Constants';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.gameEngine = null;
		this.entites = this.setupWorld();
	}

	setupWorld = () => {
		let engine = Matter.engine.create({ enableSleeping: false });
		let world = engine.world;
		let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT /2, 50, 50);

		Matter.World.add(world, [bird]);
	}

	render() {
		return (
      	<View style={styles.container}>
			{/* <RemoteControl></RemoteControl> */}
			<GameEngine
				ref={(ref) => {this.gameEngine = ref;}}
				style = {styles.container}
				entities = { this.entities }
				/>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
});