import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { TextArea, Button, Dimmer, Header } from 'semantic-ui-react';
import CryptoJS from 'crypto-js'


@connect(state => ({ login: state.login }))


export default class EditArticle extends Component {
  constructor(props) {
    super();
    this.state = {
      article: {}
    }
  }
  componentDidMount() {
    let userToken = window.localStorage.getItem('novi token')
		let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
		let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let id = user.user_id
    let role_name = user.role_name
    this.getArticle(id, role_name)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  getArticle = (id, role_name) => {
    let str = this.props.match.url
    let res = str.split("/");
    let pressType = res[3].toLowerCase()
    let obj = {
      role_name: role_name,
      id: id,
      press_id: this.props.match.params.id,
      press_type: pressType
    }
    let api_key = 'dada';
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/operatorEditOneArticle?api_key=${api_key}`,
      data: obj
    }).then(response =>
      this.setState({
        article: response.data.article,
        pressType: response.data.press_type,
        time: response.data.article.created_at,
        link: response.data.article.link_src,
        slug: response.data.article.media_slug,
        text: response.data.article.text,
        company_id: response.data.article.company_id,
        original_src: response.data.article.original_src,
        modified_src: response.data.article.modified_src,
        single_page_src: response.data.article.single_page_src
      })
    )

    console.log('obj :', obj);
  }
  edit = () => {
    let api_key = 'dada';
    let obj = {}
    obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      press_type: this.state.pressType,
      press_id: this.props.match.params.id,
      text: this.state.text,
      company_id: this.state.company_id
    }
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/operatorEditText?api_key=${api_key}`,
      data: obj
    }).then(response => {
      console.log('response :', response);
      if (response.data.success === true) {
        this.setState({
          editMsg: 'Izmenili ste clanak!',
          active: true
        })
      }
      setTimeout(() => {
        this.setState({
          active: false
        })
      }
        , 2000)
    })
    console.log('obj :', obj);
  }
  render() {
    console.log('this.state :', this.state);
    const { active } = this.state

    return (
      <div>
        <Dimmer active={active} page>
          <Header inverted>
            {this.state.editMsg}
          </Header>
        </Dimmer>
        <h1>Edituj clanak</h1>
        <div>Izdavac: {this.state.slug}</div>
        <div>Vreme: {this.state.time}</div>
        <div>Vrsta: {this.state.pressType}</div>
        <div>Link: <a href={this.state.link} target='_blank'>Link</a></div>
        {this.state.original_src ? <div>Originalni Link: <a href={this.state.original_src} target='_blank'>Link</a></div> : null}
        {this.state.modified_src ? <div>Modifikovani Link: <a href={this.state.modified_src} target='_blank'>Link</a></div> : null}
        {this.state.single_page_src ? <div>Single Link: <a href={this.state.single_page_src} target='_blank'>Link</a></div> : null}
        <TextArea style={{ minHeight: '350px', minWidth: '800px' }} name='text' value={this.state.text} onChange={this.handleChange} /><br />
        <Button content='Izmeni' color='green' onClick={this.edit} />
      </div>
    )
  }
}
