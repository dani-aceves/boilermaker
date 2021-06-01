import React from 'react'

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }
  render() {
    return (
      <h1>Hello from login</h1>
    )
  }
}

export default Login
