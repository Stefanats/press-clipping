import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

export default class AddKeywords extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keywords: []
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	pushKeyword = () => {
		let keywords = this.state.keywords;
		keywords.push({
			name: this.state.keyword,
			slug: this.state.keyword
		})
		this.setState({
			keyword: ''
		})
	}
	render() {
		const { keywords } = this.state
		const words = keywords.map((item) => {
			return (
				<ul>
					<li key={item}>{item.name}</li>
				</ul>
			)
		})
		return (
			<div>
				<span>Dodaj kljucnu rec:</span>
				<Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
				<Button content='+' onClick={this.pushKeyword} />
				{
					words
				}
				<br />
			</div>
		)
	}
}
