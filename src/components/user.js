import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearch from './user/articleSearch/index';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

class User extends React.Component {
  render() {
    return (
      this.props.login.rola === 'korisnik' ?
      <div style={{padding:"50px"}}>
      Korisnik
          <ArticleSearch />
      </div> : 
      this.props.login.rola === 'editor' ? <Redirect to="/editor" /> : 
      this.props.login.rola === 'admin' ? <Redirect to="/admin" /> : 
      <Redirect to="/operator" />
    )
  }
}

export default User;
