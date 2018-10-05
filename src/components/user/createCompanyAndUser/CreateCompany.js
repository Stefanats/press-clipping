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
			details: []
		}
	}

	componentDidMount() {
		this.addCompany()
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	addCompany = (newCompany) => {
		console.log('newMeetup :', newCompany);
		axios.request({
			method: 'post',
			url: '',
			data: newCompany
		}).then(response => {
			console.log('response :', response);
		}).catch(err => console.log('err ', err));
	}

	pushItem = () => {
		let companies = this.state.companyArr;
		companies.push({
			value: this.state.company,
			key: this.state.id + 1,
			text: this.state.company,
			keywords: this.state.keywords
		})
		this.addCompany(companies);
		this.setState({
			id: this.state.id + 1,
			keywords: [],
			keyword: '',
			company: ''
		})
	}

	pushKeyword = () => {
		let keywords = this.state.keywords;
		keywords.push(this.state.keyword)
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
		return (
			<div>
				<h2>Create Company</h2>
				<span>Company name:</span>
				<Input name='company' value={this.state.company} onChange={this.handleChange} /><br />
				<span>Company keywords:</span>
				<Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
				<Button content='+' onClick={this.pushKeyword} />
				{
					words
				}
				<br />
				<Button content='Create company' onClick={this.pushItem} />
				<Button content='Req' onClick={this.addCompany} />

			</div>
		)
	}
}

export default CreateCompany;
