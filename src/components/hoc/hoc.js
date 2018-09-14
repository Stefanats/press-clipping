import React from 'react';
import HocError from './hocError';

function Hoc (Component, props) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ulogovan: false
      }
    }
    componentDidMount() {

      let token = window.sessionStorage.getItem("token")
      if(token === "true") {
        this.setState({
          ulogovan: true
        })
      } else {
        this.setState({
          ulogovan: false
        })
      }
    }
    render() {

      return (
        <div>
          {
            this.state.ulogovan ?
            <Component /> :
            <HocError />
          }
        </div>
      )
    }
  }
}
export default Hoc;