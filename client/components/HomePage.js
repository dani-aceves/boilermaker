import React from 'react'
import { connect } from 'react-redux'

export const HomePage = (props) => {
  const username = props.username;

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(HomePage);
