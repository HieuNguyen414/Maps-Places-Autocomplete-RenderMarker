/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Result from './Result';

export default class AutoComplePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      autoSearch:[],
      text:null
    }
  }

  inputEvent(text) {
    this.setState({
      text
    },function() {
      this.autoComplete( this.state.text )
    })
  }

  autoComplete(searchText) {
    const API_KEY = "AIzaSyBsPEzbx6-yx6rk023FI0DhTM2acLd7De4";
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?location=17.2303616,106.3545596&radius=500&key=" + API_KEY + "&input=" + searchText ;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          autoSearch:responseJson.predictions
        },function() {
          console.log(this.state.autoSearch);
        })
      })
      .catch((error) => {
        console.error(error);
      });

  }


  clearAuto() {
    this.setState({
      text:null
    })
    console.log("here");
  }
  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => this.inputEvent(text)}
          value={this.state.text}
        />
        {
          this.state.text ? <Result clearAuto = { () =>  this.clearAuto()}  data={this.state.autoSearch} /> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper:{
      marginLeft:15,
      marginRight:10,
      marginTop:10,
      marginBottom:0,
      backgroundColor:"#fff",
      opacity:0.9,
      borderRadius:7
  },
  TextInput:{
     height: 40,
     borderColor: 'gray',
     borderWidth: 1
  }
});
