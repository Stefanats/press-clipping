import React, { Component } from 'react'
import { Input } from 'semantic-ui-react';


export default class EditUserPassword extends Component {
  render() {
    return (
        <Input name={this.props.name} value={this.props.value} onChange={this.props.handleChange} />
     
    )
  }
}
