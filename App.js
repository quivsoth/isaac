import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';

import RemoteControl from './RemoteControl';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import Physics from './Physics';
import Constants from './Constants';

import Wall from './Wall';
import Box from './Box';
import Hero from './Hero';


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
        let square = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 140, 100, 100, { isStatic: false });   //square.restitution = 0;        
        let hero = Matter.Bodies.rectangle( 200, 265, 50, 50,{ isStatic: false }); 
        //hero.restitution = 0;
        let bottomWall = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true });
        let topWall = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true });
        let rightWall = Matter.Bodies.rectangle( Constants.MAX_WIDTH - 15, 425, Constants.MAX_WIDTH, Constants.MAX_HEIGHT, { isStatic: true });
        let leftWall = Matter.Bodies.rectangle( 15, 425, Constants.MAX_WIDTH, Constants.MAX_HEIGHT, { isStatic: true });
        // console.log('Constants.MAX_WIDTH  :', Constants.MAX_WIDTH );
        // console.log('Constants.MAX_HEIGHT :', Constants.MAX_HEIGHT);
        
        Matter.World.add(world,[square,hero,leftWall,rightWall,bottomWall,topWall]);

        // Events
        Matter.Events.on(engine, 'collisionStart', (event) => {
          console.log("collision detected");
        //   var pairs = event.pairs;
        //   console.log(pairs);
          // this.gameEngine.dispatch({ type: "game-over"});
        });
        Matter.Events.on(engine, 'collisionEnd', (event) => {
            console.log("collision ended");
            var pairs = event.pairs;
        });

        return {
            physics: { engine: engine, world: world },
            square: { body: square, size: [100, 100], color: 'yellow', renderer: Box}, 
            hero: { body: hero, size: [50, 50], color: 'black', renderer: Hero},
            rightWall: { body: rightWall, size: [30, 840], color: 'teal', renderer: Wall},
            leftWall: { body: leftWall, size: [30, 840], color: 'teal', renderer: Wall},
            bottomWall: { body: bottomWall, size: [Constants.MAX_WIDTH, 50], color: 'teal', renderer: Wall},
            topWall: { body: topWall, size: [Constants.MAX_WIDTH, 50], color: 'teal', renderer: Wall},
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
        justifyContent: 'center',
        backgroundColor: 'brown',
        
	},
	gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});