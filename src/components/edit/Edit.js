import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Hoc from '../hoc/hoc'
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'


@Hoc
@connect(state => ({ login: state.login }))

export default class Edit extends Component {
  
  render() {
    console.log('this.props :', this.props.login.rola);

    return (
      this.props.login.rola === 'admin' ?
      <div>
        <Link to='/edit/companies'>Edit company</Link><br />
        <Link to='/edit/choose_company'>Edit user</Link>
      </div>
      : <Redirect to="/user" />
    )
  }
}
