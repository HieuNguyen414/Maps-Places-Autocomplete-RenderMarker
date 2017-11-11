import React, { Component } from 'react';
// Redux
import { Provider } from 'react-redux'
import store from './Redux/Store'

import RnDirectionsApp from './components/RnDirectionsApp';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RnDirectionsApp/>
      </Provider>
    );
  }
}
