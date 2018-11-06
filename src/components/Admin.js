import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearch from './user/articleSearch/index';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

class Admin extends React.Component {
  render() {
    console.log('this.props :', this.props);
    return (
      this.props.login.rola === 'admin' ?
      <div style={{ padding: "50px" }}>
        Admin
          {/* <ArticleSearch /> */}
      </div> : 
      this.props.login.rola === 'editor' ? <Redirect to="/editor" /> : 
      this.props.login.rola === 'korisnik' ? <Redirect to="/user" /> : 
      <Redirect to="/operator" />
    )
  }
}

export default Admin;
