import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';

@connect(state => ({ login: state.login }))

class Logout extends Component {
  logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('novi token')
    this.props.history.push('/')
    this.props.dispatch({ type: "LOGOUT" })
  }
  render() {
    console.log('props iz logout :', this.props);
    return (
      <div>
        <Button onClick={this.logout} color='red' content='Izloguj se' />
        <div style={{ marginTop: '10px' }} >Dobrodosli, {this.props.login.user}</div>
      </div>
    )
  }
}

export default withRouter(Logout);
