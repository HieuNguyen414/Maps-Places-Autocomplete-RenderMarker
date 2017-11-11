import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';

export default class Result extends Component {

  constructor(props) {
    super(props);
  }
  Getdetail(item) {
    const API_KEY = "AIzaSyBsPEzbx6-yx6rk023FI0DhTM2acLd7De4";
    const url = "https://maps.googleapis.com/maps/api/place/details/json?key=" + API_KEY + "&placeid=" + item.place_id ;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.props.clearAuto();
        
      })
      .catch((error) => {
        console.error(error);
      });
  }


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
