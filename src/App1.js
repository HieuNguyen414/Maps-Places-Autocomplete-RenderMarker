/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
  constructor(props){
    super(props);
    arrayMarkers=[
      {
        latitude:16.4728787,
        longitude:107.5667324,
      }
    ];
    this.state = {
      region:{
        latitude:16.4728787,
        longitude:107.5667324,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      },
      marker:arrayMarkers
    }
  }

  onRegionChange(data){
    this.setState({
      region:{
        latitude:data.latitude,
        longitude:data.longitude,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      }
    })
  }

  Test1(data){
    let latitude=data.nativeEvent.coordinate.latitude;
    let longitude=data.nativeEvent.coordinate.longitude;
    arrayMarkers.push({
      latitude:latitude,
      longitude:longitude,
    });
    this.setState({markers:arrayMarkers})
  }

  renderMarkers(){
    markers=[];
    for (marker of this.state.marker){
      markers.push(
        <MapView.Marker
            key={marker.longitude}
            title={'Mô Tả'}
            description={'Tôi đang ở đây ' + marker.latitude}
            coordinate={marker}
        />
      )
    }
    return markers;
  }

  render() {
    return (
      <View style={{flex:1}}>
          <MapView
            style={{flex:1}}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
            onPress={this.Test1.bind(this)}
          >
            {this.renderMarkers()}
          </MapView>
      </View>
    );
  }
}
