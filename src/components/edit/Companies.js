import React, { Component } from 'react'
import axios from 'axios'
import CompanyItem from './CompanyItem';
import Hoc from '../hoc/hoc'
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

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
		let obj = {
			role_name: this.props.login.rola,
			id: this.props.login.id,
			company_id: id
		}
		axios.request({
			method: 'post',
			url: `https://press-cliping.herokuapp.com/api/companyDelete?api_key=${api_key}`,
			data: obj
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
		console.log('commmPropss :', this.props);


		let companies = this.state.companies.map((company) => {
			return (
				<CompanyItem item={company} onDelete={this.onDelete} />
			)
		})
		return (
			this.props.login.rola === 'admin' ?
				<div>
					{companies}
					<div>{this.state.message}</div>
				</div> : <Redirect to="/user" />
		)
	}
}
