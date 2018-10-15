import React, { Component } from 'react'
import Hoc from '../../hoc/hoc';
import axios from 'axios';
import { Input, Button } from 'semantic-ui-react';

@Hoc
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
			this.setState({
				message: response.data.message
			})
		}).catch(response => console.log('err ', response));
	}

	pushItem = () => {
		// let companies = this.state.companyArr;
		// companies.push({
		// 	// id: this.state.id + 1,
		// 	name: this.state.company,
		// 	slug: this.state.company,
		// 	keywords: this.state.keywords
		// })
		const errors = this.validate(this.state.company)
		this.setState({
			errors
		})
		if (Object.keys(errors).length === 0) {
			let companies = {}
			companies = {
				name: this.state.company,
				slug: this.state.company,
				keywords: this.state.keywords
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
			<div>
				<h2>Create Company</h2>
				<span>Company name:</span>
				<Input name='company' value={this.state.company} onChange={this.handleChange} /><br />
				<span style={{ color: 'red' }}>{this.state.errors.name}</span><br />
				<span>Company keywords:</span>
				<Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
				<Button content='+' onClick={this.pushKeyword} />
				{
					words
				}
				<br /><br />
				<p>{this.state.message}</p>
				<Button content='Create company' onClick={this.pushItem} />

			</div>
		)
	}
}

export default CreateCompany;
