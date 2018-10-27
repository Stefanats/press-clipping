import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearchEditor from './editor/index';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

class Editor extends React.Component {
  render() {
    return (
      this.props.login.rola === 'editor' ?
      <div style={{padding:"50px"}}>
      Editor
          <ArticleSearchEditor />
      </div> : 
      this.props.login.rola === 'admin' ? <Redirect to="/admin" /> : 
      this.props.login.rola === 'korisnik' ? <Redirect to="/user" /> : 
      <Redirect to="/operator" />
    )
  }
}

export default Editor;
