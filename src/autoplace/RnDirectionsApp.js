import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
//AutoComple

import AutoComplePlace from './AutoComplePlace';

export default class RnDirectionsApp extends Component {
  render() {
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:16.4728787,
          longitude:107.5667324,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        }}>
        </MapView>
        <AutoComplePlace />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
