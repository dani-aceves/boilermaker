import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const TOKEN = 'TOKEN';

//action type

const SET_AUTH = 'SET_AUTH';

//action creator

const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    auth
  }
}

//thunk creators
export const createAuth = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if(token){
        const { data } = await axios.get('/api/users/auth/me', {
          headers: {
            authorization: token
          }
        })
        return dispatch(setAuth(data));
      }
    } catch (error) {
      console.log('err in createAuth: ',error);
    }
  }
}

export const authenticate = (username, password, method) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/auth/${method}`, {username, password});
      window.localStorage.setItem(TOKEN, data.token);
      dispatch(createAuth())
    } catch (error) {
      return dispatch(setAuth({error: error}))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

const reducer = (state = {}, action) => {
  switch(action.type){
    case SET_AUTH:
      return action.auth;
    default:
      return state
  }
}

export default createStore(
  dummyReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  ));
