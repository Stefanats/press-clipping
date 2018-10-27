import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearch from './user/articleSearch/index';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

class Operator extends React.Component {
  render() {
    return (
      this.props.login.rola === 'operator' ?
      <div style={{padding:"50px"}}>
      Operator
          <ArticleSearch />
      </div> : 
      this.props.login.rola === 'admin' ? <Redirect to="/admin" /> : 
      this.props.login.rola === 'korisnik' ? <Redirect to="/user" /> : 
      <Redirect to="/editor" />
    )
  }
}

export default Operator;
