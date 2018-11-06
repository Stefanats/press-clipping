import React, { Component } from 'react'
import axios from 'axios';
import UserItem from './UserItem'
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js'


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
			})
	}
	get = () => {
		let userToken = window.localStorage.getItem('novi token')
		let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
		let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		let obj = {}
		obj = {
			id: user.user_id,
			role_name: user.role_name,
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
			if (response.data.success === true) {
				this.setState({
					message: 'Korisnik obrisan!'
				})
			}

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
			<div style={{ padding: '50px' }}>
				<h2>Lista korisnika: </h2>
				{usersArr}
				<div style={{fontSize:'16px'}}>{this.state.message}</div>
			</div>
		)
	}
}
