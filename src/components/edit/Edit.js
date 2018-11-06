import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Hoc from '../hoc/hoc'
import { connect } from 'react-redux';
import { Redirect } from 'react-router'


@Hoc
@connect(state => ({ login: state.login }))

export default class Edit extends Component {

  render() {
    console.log('this.propsaaaaaaaaaad :', this.props.login.rola);

    return (
      this.props.login.rola === 'admin' ?
        <div style={{ padding: '50px', fontSize: '18px' }}>
          <Link to='/edit/companies'>Edituj kompaniju</Link><br /><br />
          <Link to='/edit/choose_company'>Edituj korisnika</Link>
        </div>
        : <Redirect to="/user" />
    )
  }
}
