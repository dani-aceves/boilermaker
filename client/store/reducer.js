import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const dummyReducer = (state = {},action) => {
  return state;
}

export default createStore(
  dummyReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ));
