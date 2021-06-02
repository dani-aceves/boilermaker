import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import store from './store/reducer'
import '../public/index.css';
import history from './history'

ReactDOM.render(
  <Provider store = {store}>
    <Router history = {history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
