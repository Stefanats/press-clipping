import React from 'react';

function Hoc (Component, props) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ulogovan: false
      }
    }
    componentDidMount() {
      window.localStorage.setItem("token", "true")
      let token = window.localStorage.getItem("token")
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
            <div>nisi ulogovan</div>
          }
        </div>
      )
    }
  }
}
export default Hoc;