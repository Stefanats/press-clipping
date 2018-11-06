import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class CompanyItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item,
			message: ''
		}
	}
	render() {
		return (
			<div>
				<li style={{ padding: '2px' }}>
					<span style={{ minWidth: '300px', display: 'inline-block' }}>
						<span>{this.state.item.name}</span>
						<span> {this.state.item.last_name}</span>
						<span> {this.state.item.email}</span>
					</span>
					<Button color='green'>
						<Link style={{ color: 'white' }} to={`/edit/choose_company/${this.state.item.company_id}/${this.state.item.id}`}> Edituj </Link>
					</Button>
					<Button
						onClick={() => this.props.onDelete(this.state.item.id)}
						content='Obriši'
						color='google plus'
					/><br />
				</li>
			</div>
		)
	}
}

export default CompanyItem;
