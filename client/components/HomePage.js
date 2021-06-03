import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/reducer'

export const HomePage = (props) => {
  const username = props.username;
  const handleClick = props.handleClick;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <a href="#" onClick={handleClick}>
            Logout
          </a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(HomePage);
