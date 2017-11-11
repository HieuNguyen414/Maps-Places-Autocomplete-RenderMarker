
// React Native Basic
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

//Import Lib
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

//Component Child Import
import RenderMarker from './renderMaker';
import AutoComplePlace from './AutoComplePlace';

class RnDirectionsApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: []
    }
  }

  render() {
    const {MapReducer} = this.props;
    console.log(MapReducer);
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:15.8952265,
          longitude:108.2606683,
          latitudeDelta:6,
          longitudeDelta:6
        }}>

          <View>
            {
              MapReducer.map(function(item, index){
             return (
                <RenderMarker key={index} data={item} />
                )
                })
            }
          </View>

      </MapView>
      
          <View>
            <AutoComplePlace />
          </View>

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

function mapStateToProps(state) {
  return {
    MapReducer:state.MapReducer.marker
  };
}
export default connect(mapStateToProps)(RnDirectionsApp);
