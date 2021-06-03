import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './components/HomePage'
import { Login, Signup } from './components/Authentication'
import { createAuth } from './store/reducer'
import regeneratorRuntime from "regenerator-runtime"

class Routes extends React.Component{
  componentDidMount(){
    this.props.loadData()
  }
  render(){
    const loggedIn = this.props.isLoggedIn
    console.log(loggedIn);
    return (
      <div>
        {loggedIn ? (
          <Switch>
            <Route path = "/home" component = {HomePage} />
            <Redirect to = "/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path = '/' exact component = { Login } />
            <Route path = '/login'component = { Login } />
            <Route path = '/signup'component = { Signup } />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(createAuth())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Routes);
