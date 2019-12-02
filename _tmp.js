import React, { Component } from "react";
import { Animated, PanResponder, View, StyleSheet,  } from "react-native";

export default class __Hero extends Component {
    constructor(props) {
        super (props);
        const heroCoords = null;
        const heroPosition = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                console.log("gestureState.dy : " + gestureState.vy);
                console.log("gestureState.dx : " + gestureState.dx);
                // TODO: this works for Animated but not View? how do we combine these?
                //this.setState({ heroCoords: gestureState });
                //Animated.spring(this.state.heroPosition, {toValue: {x: 90, y: 100}, }).start();
                
                this.props.body.position.y += 10;
                //this.props.body.position.x += 10;
                //this.props.body.position.y += gestureState.dy;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderRelease: (event, gestureState) => true    
        });
        this.state = {
            panResponder,
            heroCoords,
            heroPosition,
        };
    }
    render() {
        let panHandlers = this.state.panResponder.panHandlers;
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        return (
        <View style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color
                }}{...panHandlers}>
        </View>
    );
  }
}
