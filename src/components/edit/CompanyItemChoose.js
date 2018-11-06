import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CompanyItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item
		}
	}
	render() {
		return (
			<div>
				<li style={{ padding: ' 3px',fontSize:'18px' }}>
					<Link to={`/edit/choose_company/${this.state.item.id}`}>{this.state.item.name}</Link>
				</li>
			</div>
		)
	}
}

export default CompanyItem;
