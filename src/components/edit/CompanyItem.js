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
	// onDelete = (id) => {
	// 	// let companyId = this.state.item.id
	// 	console.log('companyId :', id);
	// 	let api_key = 'dada';
	// 	axios.request({
	// 		method: 'delete',
	// 		url: `https://press-cliping.herokuapp.com/api/companies/${id}?api_key=${api_key}`,
	// 		data: id
	// 	}).then(response => {
	// 		this.setState({
	// 			message: response.data.message
	// 		})
	// 		console.log('response :', response);
	// 	}).catch(err => console.log('err ', err));
	// }
	render() {
		console.log('this.state.item :', this.state.item);
		return (
			<div>
				<li>
					<span>{this.state.item.name}</span>
					<Link to={`/edit/companies/${this.state.item.id}`}> EDIT </Link>
					{/* <Button onClick={this.onDelete} content='delete' /><br /> */}
					<Button
						// onClick={() => this.onDelete(this.state.item.id)} 
						onClick={() => this.props.onDelete(this.state.item.id)}
						content='delete' /><br />
				</li>
			</div>
		)
	}
}

export default CompanyItem;
