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
	render() {
		console.log('this.state.item :', this.state.item);
		return (
			<div>
				<li style={{ padding: '5px 0px 5px' }}>
					<span style={{ paddingRight: '20px', minWidth: '150px', display: 'inline-block', fontSize: '14px' }}>{this.state.item.name}</span>
					<Button color='green'><Link style={{ color: 'white'}} to={`/edit/companies/${this.state.item.id}`}> Edit </Link></Button>
					<Button
						onClick={() => this.props.onDelete(this.state.item.id)}
						content='Obriši' color='google plus' /><br />
				</li>
			</div>
		)
	}
}

export default CompanyItem;
