import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
