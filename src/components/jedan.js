import React from 'react';
import { connect } from 'react-redux';
import Hoc from './hoc';

class Jedan extends React.Component {
  render() {
    let name = "stefan"
    return (
      <div>
          Jedan
      </div>
    )
  }
}

const mapStateToProps = state => ({
})
export default Hoc(Jedan)