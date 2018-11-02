import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';


@connect(state => ({ proba: state.articleSearch, login: state.login }))

class PressPublisher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			media: []
		}
	}

	componentDidMount() {
		this.props.dispatch({
			type: "SET_PUBLISHER",
			publisher: 1
		})
		this.getPublishers()
	}
	getPublishers = () => {
		let api_key = 'dada';
		let obj = {}
		obj = {
			id: this.props.login.id,
			role_name: this.props.login.rola
		}
		axios({
			method: 'post',
			url: `https://press-cliping.herokuapp.com/api/mediaGetAll?api_key=${api_key}`,
			data: obj
		})
			.then(response => {
				let arr = [{
					key : 1000,
					text : 'Svi',
					value : 'svi'
				}
				]
				response.data.media.map((item) => {
					return arr.push({
						key: item.id,
						text: item.name,
						value: item.slug
					})
				})
				this.setState({
					media: arr
				})
				console.log('mediji :', response);
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
		console.log('this.state :', this.state);
		const { value } = this.state
		return (
			<div>
				<Menu compact>
					<Dropdown placeholder='Izaberi izdavaca...' value={value} onChange={this.select} options={this.state.media} item selection />
				</Menu>
			</div>
		)
	}
}
export default PressPublisher;
