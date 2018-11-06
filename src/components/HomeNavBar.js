import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from './login';
import Logout from './logout'
import { Menu } from 'semantic-ui-react';
import CryptoJS from 'crypto-js'


@connect(state => ({ login: state.login }))

class NavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	componentDidMount() {
		let session = window.localStorage.getItem('token')
	}
	render() {
		const { activeItem } = this.state
		return (
			<div>
				<Menu style={{ marginBottom: '0' }}>
					<h1>Press clipping</h1>
					
					<Menu.Item position='right'>
						{
							this.props.login.login ?
								<Logout /> :
								<Login />
						}
					</Menu.Item>
				</Menu>
				<div>
					{
						this.props.children
					}
				</div>
			</div>
		)
	}
}
export default NavBar;