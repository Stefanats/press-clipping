import React, { Component } from 'react'
import Hoc from '../../hoc/hoc';
import axios from 'axios';
import { Input, Button, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

let roles = [{
	key: 1, text: 'Admin', value: 1
},
{
	key: 11, text: 'Editor', value: 11
},
{
	key: 21, text: 'Operator', value: 21
},
{
	key: 31, text: 'Korisnik', value: 31
}]

@Hoc
@connect(state => ({ login: state.login }))

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersArr: [],
			user: '',
			lastname: '',
			email: '',
			password: '',
			options: [],
			message: '',
			role: '',
			companyId: '',
			errors: {
				name: '',
				lastname: '',
				email: '',
				password: '',
				company: ''
			}
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
				})
			})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleChangeDrop = (e, { value }) => { this.setState({ companyId: value }) }
	handleChangeDropRole = (e, { value }) => { this.setState({ role: value }) }

	addUser(newUser) {
		let api_key = 'dada';
		console.log('newUser :', newUser);
		axios.request({
			method: 'post',
			url: `https://press-cliping.herokuapp.com/api/users?api_key=${api_key}`,
			data: newUser
		}).then(response => {
			if (response.data.success === true) {
				this.setState({
					message: 'Korisnik kreiran!'
				})
			}
			console.log('response :', response);
		}).catch(err => console.log('err ', err));
	}

	pushUser = () => {
		const errors = this.validate(this.state.user, this.state.lastname, this.state.email, this.state.password, this.state.companyId, this.state.role)
		this.setState({
			errors
		})
		if (Object.keys(errors).length === 0) {
			let users = {}
			users = {
				name: this.state.user,
				last_name: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				company_id: this.state.companyId,
				role_id: this.state.role,
				role_name: this.props.login.rola,
				id: this.props.login.id
			}
			this.addUser(users);
			this.setState({
				user: '',
				lastname: '',
				email: '',
				password: '',
				companyId: '',
				role: ''
			})
		} else {
			this.setState({
				errors
			})
		}
	}

	validate = (name, lastname, email, password, company, role) => {
		const errors = {};
		let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!name) errors.name = "Obavezno polje!";
		if (!lastname) errors.lastname = "Obavezno polje!";
		if (!email || (!email.match(emailRegex))) errors.email = "Obavezan email format!";
		if (!password) errors.password = "Obavezno polje!";
		if (!company) errors.company = "Obavezno polje!";
		if (!role) errors.role = "Obavezno polje!";
		return errors;
	}

	render() {
		const { companyId, options, role } = this.state
		console.log('this.state :', this.state);
		return (
			this.props.login.rola === 'admin' ?
				<div style={{ padding: '50px' }}>
					<h2>Kreiraj korisnika:</h2>
					<span style={{minWidth:'100px',display:'inline-block'}}>Ime: </span>
					<Input name='user' value={this.state.user} onChange={this.handleChange} />
					<br />
					<span >{this.state.errors.name}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Prezime: </span>
					<Input name='lastname' value={this.state.lastname} onChange={this.handleChange} />
					<br />
					<span>{this.state.errors.lastname}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Email: </span>
					<Input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
					<br />
					<span>{this.state.errors.email}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Šifra: </span>
					<Input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
					<br />
					<span>{this.state.errors.password}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Kompanija: </span>
					<Dropdown placeholder='Izaberi kompaniju' item selection options={options} onChange={this.handleChangeDrop} value={companyId} /><br />
					<span>{this.state.errors.company}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Rola: </span>
					<Dropdown placeholder='Izaberi rolu' item selection options={roles} onChange={this.handleChangeDropRole} value={role} /><br />
					<span>{this.state.errors.role}</span><br />
					<span style={{ fontSize: '16px' }}>{this.state.message}</span><br /><br />
					<Button color='green' content='Kreiraj' onClick={this.pushUser} />
				</div> : <Redirect to="/user" />
		)
	}
}

export default CreateUser;



