import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';


class HocError extends Component {
  goHome = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div style={{height:'100vh', display:"flex",background:"red", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
        <div style={{fontSize:"25px", fontWeight: "bolder", color: "#fff", marginBottom:"50px"}}>You'r session has been expired!</div>
        <Button onClick={this.goHome} color='grey' content='Go home' />
      </div>
    )
  }
}
export default withRouter(HocError);