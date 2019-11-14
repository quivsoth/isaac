import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import RemoteControl from './RemoteControl';
import Constants from './Constants';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.gameEngine = null;
		var Engine = Matter.Engine,
			World = Matter.World,
			Bodies = Matter.Bodies
	}
	render() {
		return (
			<View>
				<Text>Why helsslo</Text>
			</View>
		);
	}
}
// export default class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.gameEngine = null;
// 		this.entites = this.setupWorld();
// 	}

// 	setupWorld = () => {
// 		let engine = Matter.engine.create({ enableSleeping: false });
// 		let world = engine.world;
// 		let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT /2, 50, 50);

// 		Matter.World.add(world, [bird]);

// 		return {
// 			physics: { engine: engine, world: world },
// 			bird: { body: bird, size: [50,50], color: 'red', rederer: Bird }
// 		}
// 	}

// 	render() {
// 		return (
//       	<View style={styles.container}>
// 			{/* <RemoteControl></RemoteControl> */}
// 			<GameEngine
// 				ref={(ref) => {this.gameEngine = ref;}}
// 				style = {styles.container}
// 				entities = { this.entities }
// 				/>
// 		</View>
// 		);
// 	}
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
});