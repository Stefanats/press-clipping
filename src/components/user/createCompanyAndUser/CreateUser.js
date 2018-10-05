import React, { Component } from 'react'
import Hoc from '../../hoc/hoc';
import axios from 'axios';

import { Input, Button, Dropdown } from 'semantic-ui-react';

// const options = [
// 	{ key: 1, text: 'One', value: 1 },
// 	{ key: 2, text: 'Two', value: 2 },
// 	{ key: 3, text: 'Three', value: 3 },
// ]

@Hoc
class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersArr: [],
			user: '',
			lastname: '',
			options: [
				{ key: 1, text: 'One', value: 1 },
				{ key: 2, text: 'Two', value: 2 },
				{ key: 3, text: 'Three', value: 3 },
			]
		}
	}

	componentDidMount() {
		this.addCompany()
	}

	addCompany = () => {
		let api_key = 'dada';
		axios({
			method: 'get',
			url: `https://press-cliping.herokuapp.com/api/companies?api_key=${api_key}`,
		})
			.then(response => {
				let arr = [];
				response.data.company.map((item) => {
					return arr.push({
						key: item.id,
						text: item.name,
						value: item.id
					})
				})
				this.setState({
					options: arr
				}, () => {
					console.log('response', this.state.details);
				})
			})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleChangeDrop = (e, { value }) => { this.setState({ value }) }

	addUser(newUser) {
		console.log('newUser :', newUser);
		axios.request({
			method: 'post',
			url: '',
			data: newUser
		}).then(response => {
			console.log('response :', response);
		}).catch(err => console.log('err ', err));
	}

	pushUser = () => {
		let users = this.state.usersArr;
		users.push({
			name: this.state.user,
			lastname: this.state.lastname,
			companyId: this.state.value
		})
		this.addUser(users);
		this.setState({
			user: '',
			lastname: '',
			value: ''
		})
	}
	render() {
		const { value, options } = this.state
		console.log('this.state :', this.state);
		return (
			<div>
				<h2>Create User:</h2>
				<span>Name:</span>
				<Input name='user' value={this.state.user} onChange={this.handleChange} />
				<br />
				<span>Last name:</span>
				<Input name='lastname' value={this.state.lastname} onChange={this.handleChange} />
				<br />
				<Dropdown placeholder='Izaberi kompaniju' item selection options={options} onChange={this.handleChangeDrop} value={value} /><br />
				<Button content='Create user' onClick={this.pushUser} />
			</div>
		)
	}
}

export default CreateUser;



