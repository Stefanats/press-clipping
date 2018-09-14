import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';

@connect(state => ({ login: state.login }))

class Logout extends Component {
  logout = () => {
    window.sessionStorage.removeItem('token')
    this.props.history.push('/')
    this.props.dispatch({ type: "LOGOUT" })
  }
  render() {
    return (
      <Button onClick={this.logout} color='red' content='Logout' />
    )
  }
}

export default withRouter(Logout);
