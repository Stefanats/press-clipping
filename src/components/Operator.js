import React from 'react';
import Hoc from './hoc/hoc';
import ArticleSearchOperator from './operator/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import Background from '../images/159.jpg'

@Hoc
@connect(state => ({ login: state.login }))

class Operator extends React.Component {
  render() {
    return (
      this.props.login.rola === 'operator' ?
        <div style={{ padding: "50px" }}>
          Operator
          <ArticleSearchOperator />
        </div> :
        this.props.login.rola === 'admin' ? <Redirect to="/admin" /> :
          this.props.login.rola === 'korisnik' ? <Redirect to="/user" /> :
            <Redirect to="/editor" />
    )
  }
}

export default Operator;
