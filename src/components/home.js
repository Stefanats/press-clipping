import React, { Component } from 'react';
import bg from '../images/homeBg.jpg';

export default class Home extends Component {
  render() {
    return (
      <div style={{display:"flex", height:"100vh", backgroundImage: `url(${bg})`}}>
        <div style={{height:'100%', width:'100%', background:'rgba(0, 0, 0, .7)'}}></div>
      </div>
    )
  }
}
