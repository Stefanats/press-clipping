import React, { Component } from 'react'
import axios from 'axios'
import CompanyItem from './CompanyItem';

export default class Companies extends Component {
	constructor(props) {
		super();
		this.state = {
			companies: []
		}
	}
	componentDidMount() {
		this.getCompanies();
	}
	getCompanies = () => {
		let api_key = 'dada';
		axios({
			method: 'get',
			url: `https://press-cliping.herokuapp.com/api/companies?api_key=${api_key}`,
		})
			.then(response => {
				this.setState({
					companies: response.data.company
				})
			})
	}
	render() {
		console.log('this.state :', this.state);

		let companies = this.state.companies.map((company) => {
			return (
				<CompanyItem item={company} />
			)
		})
		return (
			<div>
				{companies}
			</div>
		)
	}
}
