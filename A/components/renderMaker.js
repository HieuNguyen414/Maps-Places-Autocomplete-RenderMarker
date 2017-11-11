
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
export default class RenderMarker extends Component {
  render() {
    const {data} = this.props;
    const { lat , lng } = this.props.data.geo
    return (
      <MapView.Marker draggable
         coordinate={{latitude:lat,longitude:lng}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
