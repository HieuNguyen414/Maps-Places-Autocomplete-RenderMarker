'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';



const middleware = () => {
  return applyMiddleware( thunk  );
}
import MapReducer from './MapReducer';


const store =  createStore(
  combineReducers({
    MapReducer
  }),
  middleware(),
);
export default  store;
