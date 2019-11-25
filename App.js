import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import RemoteControl from './RemoteControl';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import Physics from './Physics';
import Constants from './Constants';

import Walls from './Walls';
import Box from './Box';
import Boxthatmoves from './Boxthatmoves';


export default class App extends Component {
	constructor(props){
        super(props);
        this.state = {
            running: true
        };
        this.gameEngine = null;
        this.entities = this.setupWorld();
	}

	setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;
        
        // Objects
        let square = Matter.Bodies.rectangle( 150, 220, 100, 100, { isStatic: false });   //square.restitution = 0;
        let circle = Matter.Bodies.rectangle( 30, 30, 50, 50); //circle.restitution = 0;
        let floor = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true }); 
        
        Matter.World.add(world, [floor,circle,square]);

        // Events
        Matter.Events.on(engine, 'collisionStart', (event) => {
          console.log("collision detected");
          var pairs = event.pairs;
          //console.log(pairs);
          // this.gameEngine.dispatch({ type: "game-over"});
        });
        Matter.Events.on(engine, 'collisionEnd', (event) => {
            console.log("collision ended");
            var pairs = event.pairs;
        });

        return {
            physics: { engine: engine, world: world },
            floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'teal', renderer: Walls},
            square: { body: square, size: [100, 100], color: 'orange', renderer: Box},
            circle: { body: circle, size: [50, 50], color: 'purple', renderer: Boxthatmoves},            
        }
	}
	render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => { this.gameEngine = ref; }}
                    style={styles.gameContainer}
                    systems={[Physics]}
                    entities={this.entities}>
                    <StatusBar hidden={true} />
                </GameEngine>
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
	gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});