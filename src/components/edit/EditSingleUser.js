import React, { Component } from 'react'

export default class EditSingleUser extends Component {
  render() {
    let a = this.props.location.pathname;
    var res = a.split("/");
    console.log('res :', res[3]);
    return (
      <div>
        {this.props.match.params.id}
      </div>
    )
  }
}
