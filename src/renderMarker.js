/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
export default class MyComponent extends Component {
  render() {
    return (
      <MapView.Marker
			  coordinate={this.props.region}
		  />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
