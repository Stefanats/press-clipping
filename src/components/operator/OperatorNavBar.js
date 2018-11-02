import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from '../login';
import Logout from '../logout'
import { Menu } from 'semantic-ui-react';

@connect(state => ({ login: state.login }))

class OperatorNavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	componentDidMount() {
		let session = window.localStorage.getItem('token')
		let user = window.localStorage.getItem('user')
		user = JSON.parse(user)
		!session ? this.setState({ token: true }) : this.setState({ token: false })
		!session ? this.props.dispatch({ type: "LOGOUT" }) : this.props.dispatch({ type: "LOGIN", user: user.name, rola: user.role_name, id: user.user_id })
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
						<Link to='/operator'>
							Home Operator
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
export default OperatorNavBar;