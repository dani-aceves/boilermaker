import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/reducer'

export const HomePage = (props) => {
  const username = props.username;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <a href = '#' onClick = {props.logoutUser}>Logout</a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout())
  }
}

export default connect(mapStateToProps)(HomePage);
