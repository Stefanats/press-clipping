import React from 'react'

function Hoc (Component, props) {
  return class extends React.Component {
    render() {
      return (
        <div style={{background:"red"}}>
          <Component />
        </div>
      )
    }
  }
}
export default Hoc;