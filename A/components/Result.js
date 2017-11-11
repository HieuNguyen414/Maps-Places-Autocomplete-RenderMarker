import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
class Result extends Component {

  //Get Data From Place ID
  Getdetail(item) {
    const API_KEY = "AIzaSyCftiWBcor2fRvkBdY25jtGPTNX30dJbaU";
    const url = "https://maps.googleapis.com/maps/api/place/details/json?key=" + API_KEY + "&placeid=" + item.place_id ;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        //Call Redux For Get Detail form Place ID
        this.props.dispatch({
          type:'GET_LOCATION',
          payload:responseJson.result.geometry.location,
          data:item.description
        })
        //For Clear Input Text
        this.props.clearAuto();
      })
      .catch((error) => {
        //Show Error
        console.error(error);
      });
  }

  //Render Item For AutoPlace
  _renderItem = ({item}) => {
    return(
      <View >
        <TouchableOpacity
           onPress={ () => this.Getdetail(item) }>
           <Text>{item.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //Render unique Key
  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
});


function mapStateToProps(state) {
  return {
    MapReducer:state.MapReducer
  };
}
export default connect(mapStateToProps)(Result);
