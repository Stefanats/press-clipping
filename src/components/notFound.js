import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class NotFound extends Component {
  goHome = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div style={{height:'100vh', display:"flex",background:"red", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
        <div style={{fontSize:"25px", fontWeight: "bolder", color: "#fff", marginBottom:"50px"}}>Route not found!</div>
        <Button onClick={this.goHome} color='grey' content='Go home' />
      </div>
    )
  }
}
export default NotFound;
