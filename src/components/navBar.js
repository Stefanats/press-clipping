import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from './login';
import Logout from './logout'
import { Menu } from 'semantic-ui-react';

@connect(state => ({ login: state.login }))

class NavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	componentDidMount() {
		let session = window.sessionStorage.getItem('token')
		!session ? this.setState({ token: true }) : this.setState({ token: false })
		!session ? this.props.dispatch({ type: "LOGOUT" }) : this.props.dispatch({ type: "LOGIN" })
	}
	render() {
		const { activeItem } = this.state
		return (
			<div>
				<Menu style={{ marginBottom: '0' }}>
					<h1>Press clipping</h1>
					<Menu.Item
						name='userPage'
						active={activeItem === 'userPage'}
						onClick={this.handleItemClick}
					>
						<Link to='/user'>
							User Page
						</Link>
					</Menu.Item>
					<Menu.Item
						name='company'
						active={activeItem === 'company'}
						onClick={this.handleItemClick}
					>
						<Link to='/createCompany'>
							Create Company
						</Link>
					</Menu.Item>
					<Menu.Item
						name='user'
						active={activeItem === 'user'}
						onClick={this.handleItemClick}
					>
						<Link to='/createUser'>
							Create User
						</Link>
					</Menu.Item>
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