import React, { Component } from 'react'
import axios from 'axios';
import EditUserName from './editUser/EditUserName'
import EditUserLastName from './editUser/EditUserLastName'
import EditUserEmail from './editUser/EditUserEmail'
import { Button, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js'


let roles = [{
  key: 1, text: 'Admin', value: 1
},
{
  key: 11, text: 'Editor', value: 11
},
{
  key: 21, text: 'Operator', value: 21
},
{
  key: 31, text: 'Korisnik', value: 31
}]

@connect(state => ({ login: state.login }))

export default class EditSingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      newEmail: '',
      password: '',
      role: ''
    }
  }
  componentDidMount() {
    this.getUser()
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleChangeDropRole = (e, { value }) => { this.setState({ role: value }) }
  getUser = () => {
    let api_key = 'dada';
    let user_id = this.props.match.params.id;
    let userToken = window.localStorage.getItem('novi token')
    let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
    let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let obj = {
      user_id,
      role_name: user.role_name,
      id: user.user_id
    }
    axios({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/userGetOne?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        this.setState({
          name: response.data.user.name,
          lastName: response.data.user.last_name,
          email: response.data.user.email,
          newEmail: response.data.user.email,
          role: response.data.user.role_id
        })
        console.log('responseSingleUser :', response);
      })

  }
  editUser = (editedUser) => {
    console.log('editedUser :', editedUser);
    let api_key = 'dada';
    let user_id = this.props.match.params.id;
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/users/${user_id}?api_key=${api_key}`,
      data: editedUser
    }).then(response => {
      if (response.data.success === true) {
        this.setState({
          message: 'Korisnik editovan!'
        })
      }

      console.log('response :', response);
    }).catch(response => console.log('err ', response));
  }
  edit = () => {
    let editedUser = {}
    if (this.state.password !== '') {
      editedUser = {
        name: this.state.name,
        last_name: this.state.lastName,
        password: this.state.password,
        role_id: this.state.role,
        role_name: this.props.login.rola,
        id: this.props.login.id
      }
    } if (this.state.email !== this.state.newEmail) {
      editedUser = {
        name: this.state.name,
        last_name: this.state.lastName,
        email: this.state.newEmail,
        role_id: this.state.role,
        role_name: this.props.login.rola,
        id: this.props.login.id
      }
    } else {
      editedUser = {
        name: this.state.name,
        last_name: this.state.lastName,
        role_id: this.state.role,
        role_name: this.props.login.rola,
        id: this.props.login.id
      }
    }

    this.editUser(editedUser)
    console.log('editedUser :', editedUser);
  }
  render() {
    console.log('this.state :', this.state);
    return (
      <div style={{ padding: '50px' }}>
        <h2>Edituj korisnika: </h2>
        <span style={{ minWidth: '100px', display: 'inline-block' }}>Ime: </span>
        <EditUserName name='name' value={this.state.name} handleChange={this.handleChange} /><br /><br />
        <span style={{ minWidth: '100px', display: 'inline-block' }}>Prezime: </span>
        <EditUserLastName name='lastName' value={this.state.lastName} handleChange={this.handleChange} /><br /><br />
        <span style={{ minWidth: '100px', display: 'inline-block' }}>Email: </span>
        <EditUserEmail name='newEmail' value={this.state.newEmail} handleChange={this.handleChange} /><br /><br />
        <span style={{ minWidth: '100px', display: 'inline-block' }}>Lozinka: </span>
        <Input name='password' value={this.state.password} onChange={this.handleChange} /><br /><br />
        <span style={{ minWidth: '100px', display: 'inline-block' }}>Rola: </span>
        <Dropdown placeholder={this.state.role} item selection options={roles} onChange={this.handleChangeDropRole} value={this.state.role} /><br /><br />
        <div style={{ fontSize: '16px' }}>{this.state.message}</div>
        <Button onClick={this.edit} content='Izmeni' color='green' />
      </div>
    )
  }
}
