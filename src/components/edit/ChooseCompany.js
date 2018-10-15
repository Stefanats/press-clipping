import React, { Component } from 'react'
import axios from 'axios'
import CompanyItemChoose from './CompanyItemChoose'

export default class ChooseCompany extends Component {
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
		let companies = this.state.companies.map((company) => {
			return (
				<CompanyItemChoose item={company} />
			)
		})
		return (
			<div>
				<h2>Izaberite kompaniju korisnika</h2>
				{companies}
			</div>
		)
	}
}
