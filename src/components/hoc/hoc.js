import React from 'react';
import HocError from './hocError';

function Hoc(Component, props) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ulogovan: false
      }
    }
    componentDidMount() {
      let token = window.localStorage.getItem("token")
      if (token !== null) {
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
              <Component {...props} /> :
              <HocError />
          }
        </div>
      )
    }
  }
}
export default Hoc;