const MapReducer = (state = { marker:new Array() } , action) =>  {
  switch (action.type) {
      //SetDataEdit
      case'GET_LOCATION':
      var temp = {};
      temp['geo'] = action.payload;
      temp['des'] = action.data;
      state = {
        ...state,
        marker:state.marker.concat(temp)
      }
      return state;
      default: return state;
  }
};


export default MapReducer;
