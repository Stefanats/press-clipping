import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Input, Button, Form, Loader, Dimmer } from 'semantic-ui-react';
import axios from 'axios';
import CryptoJS from 'crypto-js'


@connect(state => ({ login: state.login }))

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {},
      success: false,
      name: '',
      loader: false,
      errorMsg: ''
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

  loginUser(user) {
    let api_key = 'dada';
    this.setState({
      loader: true
    })
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/login?api_key=${api_key}`,
      data: user
    }).then(response => {
      if (response.data.success === false) {
        this.setState({
          loader: false,
          errorMsg: 'Korisnik nije validan!'
        })
      }
      if (response.data.success === true) {
        this.setState({
          loader: false
        })
        console.log('response.datablblblb :', response.data);
        window.localStorage.setItem("token", response.data.access_token);
        let tokenIzStorage = window.localStorage.getItem('token')
        let token = {
          token: tokenIzStorage
        }
        axios.request({
          method: 'post',
          url: `https://press-cliping.herokuapp.com/api/me?api_key=${api_key}`,
          data: token
        }).then(response => {
          console.log('responseUser :', response.data);
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data), 'lgitruybcintun');
          window.localStorage.setItem('novi token', ciphertext)
          // let noviToken = window.localStorage.getItem('novi token')
          // let bytes = CryptoJS.AES.decrypt(noviToken.toString(), 'lgitruybcintun');
          // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          // console.log('decryptedData :', decryptedData);
          this.props.dispatch({
            type: "LOGIN",
            user: response.data.name,
            rola: response.data.role_name,
            id: response.data.user_id
          });
          if (response.data.role_name === 'admin') {
            this.props.history.push("/admin");
          }
          if (response.data.role_name === 'editor') {
            this.props.history.push("/editor");
          }
          if (response.data.role_name === 'operator') {
            this.props.history.push("/operator");
          }
          if (response.data.role_name === 'korisnik') {
            this.props.history.push("/user");
          }
        }).catch(error => console.log('responsEror:', error.response))
      } else {
        this.setState({
          errors: {
            name: "Invalid"
          }
        })
      }
      console.log('response :', response);
    }).catch(err => console.log('err ', err));
  }

  handleSubmit = (e) => {

    const errors = this.validate(this.state.data);
    this.setState({
      errors
    })
    if (Object.keys(errors).length === 0) {
      let user = {};
      user = {
        email: this.state.data.email,
        password: this.state.data.password
      }
      this.loginUser(user)
    }
  }
  validate = (data) => {
    const errors = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email || (!data.email.match(emailRegex))) errors.email = "Obavezan email format!";
    if (!data.password) errors.password = "Obavezno polje!";
    return errors;
  }
  render() {
    console.log('this.state :', this.state);
    const { email, password } = this.state.data
    return (
      <Form onSubmit={this.handleSubmit} >
        <Input name='email' type='text' onChange={this.handleChange} value={email} placeholder='Email...' style={{ marginRight: '20px' }} />
        <span>{this.state.errors.email}</span>
        <Input name='password' type='password' onChange={this.handleChange} value={password} placeholder='Šifra...' style={{ marginRight: '20px' }} />
        <span>{this.state.errors.password}</span>
        <Button color='red' content='Uloguj se' /><br />
        {this.state.loader === true ? <Dimmer active style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '5px' }}>
          <Loader />
        </Dimmer> : null}
        {this.state.errorMsg}
      </Form>
    )
  }
}

export default withRouter(Login)
