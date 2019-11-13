import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import RemoteControl from './RemoteControl';

export default class App extends Component {
	constructor(props) {
		super(props);    
	}

	render() {
		return (
      <View style={stylesMain.container}>
        <RemoteControl></RemoteControl>
			</View>
		);
	}
}

const stylesMain = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
});