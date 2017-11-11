import React, {Component} from 'react';
import { Dimensions } from 'react-native';
var {height, width} = Dimensions.get('window');
const styles = {
  container: {
    flex: 1,
  },
  map:{
	flex:1,
	justifyContent: 'center',
    alignItems: 'center',
  },
  searchbox:{
	alignItems:'center',
	marginBottom:0,
	paddingBottom:0,
	alignSelf:'stretch',
	borderWidth:1,
	borderColor:'#fff',
	backgroundColor:'#fff',
  },
  input:{
	width:width,
	fontSize:16,
	height:40,
	backgroundColor:'#fff',
  },
  txtfulltext:{
    fontSize: 16,
    color: '#000000'
  },
  button:{
    height:44,
    justifyContent:'center'
  }
}
export default styles ;
