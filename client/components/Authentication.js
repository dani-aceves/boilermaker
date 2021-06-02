import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store/reducer'

class Authentication extends React.Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const username = evt.target.username.value
    const password = evt.target.password.value
    const form = evt.target.name
    this.props.auth(username, password, form);
  }
render(){
  const {name, displayName, error} = this.props
  return (
    <div>
      <form onSubmit = {this.handleSubmit} name = {name} >
        <div>
          <label htmlFor = "username" >
            <small >Username</small>
          </label>
          <input name = "username" type = "text" />
        </div>
        <div>
          <label htmlFor = "password">
            <small>Password</small>
          </label>
          <input name = "password" type = "text" />
        </div>
        <div>
          <button type = "submit">{displayName}</button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  )
}
}

const mapStateForLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.error
  }
}

const mapStateForSignUp = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (username, password, form) => dispatch(authenticate(username, password, form))
  }
}


export const Login = connect(mapStateForLogin, mapDispatchToProps)(Authentication)
export const Signup = connect(mapStateForSignUp, mapDispatchToProps)(Authentication);
