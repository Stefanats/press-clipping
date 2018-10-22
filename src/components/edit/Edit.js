import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Hoc from '../hoc/hoc'

@Hoc
export default class Edit extends Component {
  render() {
    return (
      <div>
        <Link to='/edit/companies'>Edit company</Link><br />
        <Link to='/edit/choose_company'>Edit user</Link>
      </div>
    )
  }
}
