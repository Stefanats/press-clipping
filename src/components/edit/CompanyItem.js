import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import axios from 'axios'

class CompanyItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item,
			message: ''
		}
	}
	onDelete = () => {
		let companyId = this.state.item.id
		console.log('companyId :', companyId);
		let api_key = 'dada';
		axios.request({
			method: 'delete',
			url: `https://press-cliping.herokuapp.com/api/companies/${companyId}?api_key=${api_key}`,
			data: companyId
		}).then(response => {
			this.setState({
				message: response.message
			})
			console.log('response :', response);
		}).catch(err => console.log('err ', err));
	}
	render() {
		return (
			<div>
				<li>
					<span>{this.state.item.name}</span>
					<Link to={`/edit/companies/${this.state.item.id}`}> EDIT </Link>
					<Button onClick={this.onDelete} content='delete' />
				</li>
			</div>
		)
	}
}

export default CompanyItem;
