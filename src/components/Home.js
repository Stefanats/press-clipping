import React, { Component } from 'react'
import { Input, Menu, Button, Icon, Form } from 'semantic-ui-react'

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '',
				password: ''
			},
			errors: {}
		}
	}
	handleChange = (e) => {
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			}
		})
	}
	handleSubmit = (e) => {
		const errors = this.validate(this.state.data);
		this.setState({
			errors
		})
		if (Object.keys(errors).length === 0) {
			const { name, password } = this.state.data
			const login = {
				name,
				password
			}
			console.log('login :', login);
		}
	}
	validate = (data) => {
		const errors = {};
		if (!data.name) errors.name = "Invalid name!";
		if (!data.password) errors.password = "Invalid password!";
		return errors;
	}
	render() {
		const { name, password } = this.state.data
		console.log('this.state :', this.state);
		return (
			<div>
				<Menu>
					<h1>Press clipping</h1>
					<Menu.Item position='right'>
						<Form onSubmit={this.handleSubmit} >
							<Input name='name' type='text' onChange={this.handleChange} value={name} placeholder='Name...' style={{marginRight: '20px'}} />
							<span>{this.state.errors.name}</span>
							<Input name='password' type='password' onChange={this.handleChange} value={password} placeholder='Password...' style={{marginRight: '20px'}} />
							<span>{this.state.errors.password}</span>
							<Button color='red' content='Login' />
						</Form>
					</Menu.Item>
				</Menu>
				<Icon name='newspaper outline' size='massive' />
			</div>
		)
	}
}
