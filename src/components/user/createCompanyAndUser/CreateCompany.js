import React, { Component } from 'react'
import Hoc from '../../hoc/hoc';
import axios from 'axios';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

class CreateCompany extends Component {
	constructor(props) {
		super(props);
		this.state = {
			companyArr: [],
			company: '',
			keywords: [],
			keyword: '',
			id: 0,
			message: '',
			errors: {
				name: ''
			}
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	addCompany = (newCompany) => {
		console.log('newCompany', newCompany);
		let api_key = 'dada';
		axios.request({
			method: 'post',
			url: `https://press-cliping.herokuapp.com/api/companies?api_key=${api_key}`,
			data: newCompany
		}).then(response => {
			console.log('response :', response);
			if (response.data.success === true) {
				this.setState({
					message: 'Kompanija kreirana!'
				})
			}

		}).catch(response => console.log('err ', response));
	}

	pushItem = () => {
		const errors = this.validate(this.state.company)
		this.setState({
			errors
		})
		if (Object.keys(errors).length === 0) {
			let companies = {}
			companies = {
				name: this.state.company,
				slug: this.state.company,
				keywords: this.state.keywords,
				role_name: this.props.login.rola,
				id: this.props.login.id
			}
			this.addCompany(companies);
			this.setState({
				id: this.state.id + 1,
				keywords: [],
				keyword: '',
				company: ''
			})
		} else {
			this.setState({
				errors
			})
		}
	}

	pushKeyword = () => {
		let keywords = this.state.keywords;
		keywords.push(
			this.state.keyword
		)
		this.setState({
			keyword: ''
		})
	}

	validate = (company) => {
		const errors = {};
		if (!company) errors.name = "Obavezno polje!";
		return errors;
	}

	render() {
		const { keywords } = this.state
		const words = keywords.map((item) => {
			return (
				<ul>
					<li key={item}>{item}</li>
				</ul>
			)
		})
		console.log('this.state :', this.state);
		return (
			this.props.login.rola === 'admin' ?
				<div style={{ marginLeft: '50px', paddingTop: '50px' }}>
					<h2>Kreiraj kompaniju:</h2>
					<span style={{minWidth:'100px',display:'inline-block'}}>Ime kompanije:</span>
					<Input name='company' value={this.state.company} onChange={this.handleChange} /><br />
					<span style={{ color: 'red' }}>{this.state.errors.name}</span><br />
					<span style={{minWidth:'100px',display:'inline-block'}}>Ključne reči:</span>
					<Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
					<Button content='+' color='blue' onClick={this.pushKeyword} style={{ marginLeft: '10px' }} />
					{
						words
					}
					<br /><br />
					<p style={{fontSize: '16px'}}>{this.state.message}</p>
					<Button content='Kreiraj' color='green' onClick={this.pushItem} />

				</div> : <Redirect to="/user" />
		)
	}
}

export default CreateCompany;
