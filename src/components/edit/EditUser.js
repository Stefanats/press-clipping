import React, { Component } from 'react'
import axios from 'axios';
import UserItem from './UserItem'
import { connect } from 'react-redux';

@connect(state => ({ login: state.login }))

export default class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}
	componentDidMount() {
		this.get()
	}
	getUsers = (get) => {
		let api_key = 'dada';
		// let id = this.props.login.id
		// let role_name = this.props.login.rola
		// let obj = {
		// 	id,
		// 	role_name,
		// 	company_id: this.props.match.params.id
		// }
		// console.log('obj :', obj);
		axios.request({
			method: 'post',
			url: `https://press-cliping.herokuapp.com/api/company/users?api_key=${api_key}`,
			data: get
		})
			.then(response => {
		console.log('object :', response)

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
	get = () => {
		let obj = {}
		obj = {
			id: this.props.login.id,
			role_name: this.props.login.rola,
			company_id: this.props.match.params.id
		}
		console.log('okkkkkkk :', this.props.login);
		console.log('jos jedan okkkkk :', obj);
		this.getUsers(obj)
	}
	onDelete = (id) => {
		console.log('userId :', id);
		let api_key = 'dada';
		let obj = {
			id: this.props.login.id,
			role_name: this.props.login.rola,
		}
		axios.request({
			method: 'delete',
			url: `https://press-cliping.herokuapp.com/api/users/${id}?api_key=${api_key}`,
			data: obj
		}).then(response => {
			this.setState({
				message: response.data.message
			})
			console.log('responseUSer :', response);
		}).catch(err => console.log('err ', err));
	}
	render() {
		console.log('this.jebote :', this.props);
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
