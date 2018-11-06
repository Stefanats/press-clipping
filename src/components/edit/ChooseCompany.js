import React, { Component } from 'react'
import axios from 'axios'
import CompanyItemChoose from './CompanyItemChoose'
import Hoc from '../hoc/hoc'
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

@Hoc
@connect(state => ({ login: state.login }))

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
			this.props.login.rola === 'admin' ?
				<div style={{ padding: '50px' }}>
					<h2>Izaberite kompaniju korisnika</h2>
					{companies}
				</div> : <Redirect to="/user" />
		)
	}
}
