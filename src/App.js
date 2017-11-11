import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ListView, TouchableHighlight, Dimensions } from 'react-native';
var {height, width} = Dimensions.get('window');

import styles from './Styles.js';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoder';
import AutoComplePlace from './autoplace/AutoComplePlace';
var placesArray = [];
var History = ['someWhere', 'someWhere Neh', 'someWhere'];

export default class App extends Component {

  constructor(props){
    super(props);
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
			region: {
        latitude:16.4728787,
        longitude:107.5667324,
        latitudeDelta:0.01,
        longitudeDelta:0.01
			},
  			dataSource: dataSource.cloneWithRows(placesArray),
  			isLoading:true,
  			isMarkerShow:false,
  			Address:'someWhere',
        setMarker:[]
	    };
		this.onRegionChange = this.onRegionChange.bind(this);
		this.renderRow = this.renderRow.bind(this);

	}

	onRegionChange(region) {
		this.setState({ region });
	}

  //Search
	onSearch(text){
		RNGooglePlaces.getAutocompletePredictions(text)
		.then((places) => {this.onChange(places);})
		.catch((error) => console.log(error.message));
	}

  //Dieu Huong Maps theo vi tri chon
	onMove(region)
	{
		this.setState({
			region:this.state.region,
			dataSource:this.state.dataSource,
			isLoading:true,
			isMarkerShow:false,
			Address:'someWhere',
		});
		this.onRegionChange(region);
	}

    //Render cac vi tri khi search
  	onChange(places)
	{
		this.setState({
			region:this.state.region,
			dataSource:this.state.dataSource.cloneWithRows(places),
			isLoading:false,
			isMarkerShow:false,
			Address:'someWhere',
		});
		this.onRegionChange(this.state.region);
	}

	onPickPlaces(places)
	{
		RNGooglePlaces.lookUpPlaceByID(places.placeID)
		.then((results) => {
			var region = {
				latitude: results.latitude,
				longitude: results.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			};
			this.onMove(region)
		})
		.catch((error) => console.log(error.message));
	}

  //Click Marker để lấy tên tọa độ và thông tin vị trí đã chọn
	onMarkerPress(coordinate)
	{
		var Co = {
			  lat: coordinate.latitude,
			  lng: coordinate.longitude
			};
		Geocoder.geocodePosition(Co)
		.then((res) => {
			console.log(res);
			this.setState({
				region:this.state.region,
				dataSource:this.state.dataSource,
				isLoading:true,
				isMarkerShow:true,
				Address:res[0].formattedAddress,
			});
			this.onRegionChange(this.state.region);
		})
		.catch(err => console.log(err))
	}

 //Click Chọn vị trí khi search
  renderRow(rowData, sectionID, rowID) {
 	return (
    	<TouchableHighlight
				onPress={()=>this.onPickPlaces(rowData)}
				underlayColor='#dddddd'
				style={styles.button}>
				<View>
					<Text style={styles.txtfulltext} numberOfLines={1}>{rowData.fullText}</Text>
				</View>
    	</TouchableHighlight>
		);
	}
  setMarker(item) {
    console.log(item);
  }
	render()
	{
    //currentView Loading vi tri
		var currentView =
			(this.state.isLoading)?
				<View/>:
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					enableEmptySections={true}
				/>
		var History =
			(this.state.isMarkerShow)?
				<Text>{this.state.Address}</Text>:
				<View/>

		return (
		  <View style={styles.container}>

			<View>
				<TextInput underlineColorAndroid='transparent' style={styles.input}
					onChangeText={(text)=>this.onSearch(text)}
					placeholder='search'>
				</TextInput>
					{currentView}
					{History}
          <AutoComplePlace Golocation = { () => this.setMarker(item) } />
			</View>

			<MapView style={styles.map}
			  region={this.state.region}
			>

			<MapView.Marker draggable
			   coordinate={this.state.region}
			   onDragEnd={(e)=>this.setState({x: e.nativeEvent.coordinate})}
			   onPress={(e) => {e.stopPropagation(); this.onMarkerPress(this.state.region)}}
		  />

			</MapView>
		  </View>
		);
	}
}
