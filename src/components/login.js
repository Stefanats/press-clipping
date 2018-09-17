import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Input, Button, Form } from 'semantic-ui-react';

@connect(state => ({ login: state.login }))

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        password: ''
      },
      errors: {}
    }
  }
  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSubmit = (e) => {
    const errors = this.validate(this.state.data);
    this.setState({
      errors
    })
    if (Object.keys(errors).length === 0) {
      if (this.state.data.name === "stefan") {
        if (this.state.data.password === "123") {
          window.sessionStorage.setItem("token", "true")
          this.props.dispatch({ type: "LOGIN" })
          this.props.history.push("/user");
        } else {
          this.setState({
            errors: {
              password: "Invalid"
            }
          })
        }
      } else {
        this.setState({
          errors: {
            name: "Invalid"
          }
        })
      }
    }
  }
  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Invalid name!";
    if (!data.password) errors.password = "Invalid password!";
    return errors;
  }
  render() {
    const { name, password } = this.state.data
    return (
      <Form onSubmit={this.handleSubmit} >
        <Input name='name' type='text' onChange={this.handleChange} value={name} placeholder='Name...' style={{ marginRight: '20px' }} />
        <span>{this.state.errors.name}</span>
        <Input name='password' type='password' onChange={this.handleChange} value={password} placeholder='Password...' style={{ marginRight: '20px' }} />
        <span>{this.state.errors.password}</span>
        <Button color='red' content='Login' />
      </Form>
    )
  }
}

export default withRouter(Login)
