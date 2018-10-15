import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const options = [
  { key: 1, text: 'Svi', value: 'svi' },
  { key: 2, text: 'Elektronski', value: 'elektronski' },
  { key: 3, text: 'Štampani', value: 'stampani' }
]

@connect(state => ({ proba: state.articleSearch }))

class PressType extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({
      type: "SET_PRESSTYPE",
      pressType: 1
    })
  }
  select = (e, { value }) => {
    this.props.dispatch({
      type: "SET_PRESSTYPE",
      pressType: value
    })
    this.setState({ value })
  }

  render() {
    console.log('thisssssss :', this.state);
    return (
      <div>
        <Menu compact>
          <Dropdown name='medij' placeholder='Vrsta medija...' value={this.state.value} onChange={this.select} options={options} item selection />
        </Menu>
      </div>
    )
  }
}
export default PressType;
