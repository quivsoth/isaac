import React, { Component } from 'react';
import { Button, Dimensions, Animated, PanResponder, View, StyleSheet, Text } from 'react-native';
// import Draggable from 'react-native-draggable';

export default class Hero extends Component {
	constructor(props) {
		super(props);

        const _gestureOffset = { x: 0, y: 0 };

		this.state = {
            pan: new Animated.ValueXY(),
            _gestureOffset
        };
        
        


		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,			
			// onPanResponderMove: Animated.event([
			// 	null,
			// 	{
			// 		dx: this.state.pan.x,
			// 		dy: this.state.pan.y
			// 	}
			// ]),
			onPanResponderMove: (evt, gestureState) => {
			    this.props.body.position.x = gestureState.moveX;
                this.props.body.position.y = gestureState.moveY;
                // let offset = {x: this.state._gestureOffset.x + gestureState.dx, y: this.state._gestureOffset.y + gestureState.dy};
                // this.setState({_gestureOffset: offset});
			    // console.log(gestureState);
			},
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderRelease: (event, gestureState) => {                 
                // let offset = {x: this.state._gestureOffset.x += gestureState.dx, y: this.state._gestureOffset.y += gestureState.dy};
                // this.setState({_gestureOffset: offset});
            },
		});
	}

	render() {
		const width = this.props.size[0];
		const height = this.props.size[1];
		const x = this.props.body.position.x - width / 2;
		const y = this.props.body.position.y - height / 2;
		return <View  {...this.panResponder.panHandlers}
		    style={{
		        left: x,
		        top: y,
		        width: width,
		        height: height,
		        backgroundColor: this.props.color}}>
		        {/* {this.renderDraggable()} */}
		    </View>;
	}

	// renderDraggable() {
	// 	const width = this.props.size[0];
	// 	const height = this.props.size[1];
	// 	const x = this.props.body.position.x - width / 2;
	// 	const y = this.props.body.position.y - height / 2;
	// 	return (
	// 		<Animated.View {...this.panResponder.panHandlers} style={[ this.state.pan.getLayout(), styles.circle ]}>
	// 			<Text style={styles.text}>Drag me!</Text>
	// 		</Animated.View>			
	// 	);
	// }
}

// let CIRCLE_RADIUS = 36;
// let Window = Dimensions.get('window');
// let styles = StyleSheet.create({
// 	mainContainer: {
// 		flex: 1
// 	},

// 	text: {
// 		marginTop: 25,
// 		marginLeft: 5,
// 		marginRight: 5,
// 		textAlign: 'center',
// 		color: '#fff'
// 	},
// 	draggableContainer: {
// 		position: 'absolute',
// 		top: Window.height / 2 - CIRCLE_RADIUS,
// 		left: Window.width / 2 - CIRCLE_RADIUS
// 	},
// 	circle: {
// 		backgroundColor: 'navy',
// 		width: CIRCLE_RADIUS * 2,
// 		height: CIRCLE_RADIUS * 2,
// 		borderRadius: CIRCLE_RADIUS
// 	}
// });
