import React, { Component } from 'react'

export default class Article extends Component {
  render() {
    return (
      <div>
        <a href={this.props.link} target="_blank">Link</a>
        <p>{this.props.text}</p>
      </div>
    )
  }
}
