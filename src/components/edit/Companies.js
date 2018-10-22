import React, { Component } from 'react'
import axios from 'axios'
import CompanyItem from './CompanyItem';
import Hoc from '../hoc/hoc'

@Hoc
export default class Companies extends Component {
	constructor(props) {
		super();
		this.state = {
			companies: [],
			message: ''
		}
	}
	componentDidMount() {
		this.getCompanies();
	}
	onDelete = (id) => {
		// let companyId = this.state.item.id
		console.log('companyId :', id);
		let api_key = 'dada';
		axios.request({
			method: 'delete',
			url: `https://press-cliping.herokuapp.com/api/companies/${id}?api_key=${api_key}`,
			data: id
		}).then(response => {
			this.setState({
				message: response.data.message
			})
			console.log('response :', response);
		}).catch(err => console.log('err ', err));
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
		console.log('commm :', this.state);

		let companies = this.state.companies.map((company) => {
			return (
				<CompanyItem item={company} onDelete={this.onDelete} />
			)
		})
		return (
			<div>
				{companies}
				<div>{this.state.message}</div>
			</div>
		)
	}
}
