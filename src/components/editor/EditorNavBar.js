import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Login from '../login';
import Logout from '../logout'
import { Menu } from 'semantic-ui-react';
import CryptoJS from 'crypto-js'
import pic from '../../images/159.jpg'


@connect(state => ({ login: state.login }))

class EditorNavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	componentDidMount() {
		let session = window.localStorage.getItem('token')
		let userToken = window.localStorage.getItem('novi token')
		let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
		let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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
						<Link to='/editor'>
							Početna
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
				<div style={{ background: `url(${pic})`, backgroundPosition: 'cover', minHeight: '100vh' }}>
					{
						this.props.children
					}
				</div>
			</div>
		)
	}
}
export default EditorNavBar;