import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const options = [
	{ key: 1, text: 'Svi', value: 'svi' },
	{ key: 2, text: 'Novosti', value: 'novosti' },
	{ key: 3, text: 'Sbb22', value: 'sbb22' },
]

@connect(state => ({ proba: state.articleSearch }))

class PressPublisher extends Component {
	state = {}

	componentDidMount() {
		this.props.dispatch({
			type: "SET_PUBLISHER",
			publisher: 1
		})
	}
	select = (e, { value }) => {
		this.props.dispatch({
			type: "SET_PUBLISHER",
			publisher: value
		})
		this.setState({ value })
	}

	render() {
		const { value } = this.state
		return (
			<div>
				<Menu compact>
					<Dropdown placeholder='Izaberi izdavaca...' value={value} onChange={this.select} options={options} item selection />
				</Menu>
			</div>
		)
	}
}
export default PressPublisher;
