import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Logout from './logout'
import { Menu } from 'semantic-ui-react';

@connect(state => ({ login: state.login }))

class NavBar extends Component {
	componentDidMount() {
		let session = window.sessionStorage.getItem('token')
		!session ? this.setState({ token: true }) : this.setState({ token: false })
		!session ? this.props.dispatch({ type: "LOGOUT" }) : this.props.dispatch({ type: "LOGIN" })
	}
	render() {
		return (
			<div>
				<Menu style={{marginBottom: '0'}}>
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