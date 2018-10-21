import React, { Component } from 'react'
import axios from 'axios';
import UserItem from './UserItem'

export default class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}
	componentDidMount() {
		this.getUsers()
	}
	getUsers = () => {
		let api_key = 'dada';
		let company_id = this.props.match.params.id;
		axios({
			method: 'get',
			url: `https://press-cliping.herokuapp.com/api/company/users?company_id=${company_id}&api_key=${api_key}`,
		})
			.then(response => {
				this.setState({
					users: response.data.users
				})
				// let usersArr = [];
				// response.data.users.map((item => {
				// 	return usersArr.push({
				// 		id: item.id,
				// 		name: item.name,
				// 		last_name: item.last_name,
				// 		email: item.email
				// 	})
				// }))
				// this.setState({
				// 	users: usersArr
				// })
			})
	}
	onDelete = (id) => {
		console.log('userId :', id);
		let api_key = 'dada';
		axios.request({
			method: 'delete',
			url: `https://press-cliping.herokuapp.com/api/users/${id}?api_key=${api_key}`,
			data: id
		}).then(response => {
			this.setState({
				message: response.data.message
			})
			console.log('responseUSer :', response);
		}).catch(err => console.log('err ', err));
	}
	render() {
		console.log('this.state :', this.state);
		const { users } = this.state
		const usersArr = users.map((user) => {
			return (
				<UserItem item={user} onDelete={this.onDelete} />
			)
		})
		return (
			<div>
				{usersArr}
			</div>
		)
	}
}
