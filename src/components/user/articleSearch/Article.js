import React, { Component } from 'react'
import { GridColumn } from 'semantic-ui-react';
import { TextArea } from 'semantic-ui-react'

export default class Article extends Component {

	render() {
		return (
			<GridColumn computer={4} style={{ marginTop: '30px' }}>
				<a style={{ fontSize: '18px' }} href={this.props.link} target="_blank">Link</a>
				 <a style={{ fontSize: '18px' }} href={this.props.original_link} target="_blank">Originalni Pdf</a>
				<div>Izdavac: {this.props.slug}</div>
				<div>Vreme: {this.props.time}</div>
				<TextArea value={this.props.text} style={{ width: '100%' }}></TextArea>
				
			</GridColumn>
		)
	}
}
