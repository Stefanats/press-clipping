import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const options = [
  { key: 1, text: 'Svi', value: 1 },
  { key: 2, text: 'Elektronski', value: 2 },
  { key: 3, text: 'Štampani', value: 3 },
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
  select = (e, {value}) => {
    this.props.dispatch({
      type: "SET_PRESSTYPE",
      pressType: value
    })
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Menu compact>
          <Dropdown placeholder='Vrsta medija...' value={value} onChange={this.select} options={options} item selection />
        </Menu>
      </div>
    )
  }
}
export default PressType;
