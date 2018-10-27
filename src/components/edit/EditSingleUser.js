import React, { Component } from 'react'
import axios from 'axios';
import EditUserName from './editUser/EditUserName'
import EditUserLastName from './editUser/EditUserLastName'
import EditUserEmail from './editUser/EditUserEmail'
import { Button, Input, Dropdown } from 'semantic-ui-react';

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
    axios({
      method: 'get',
      url: `https://press-cliping.herokuapp.com/api/users/${user_id}?api_key=${api_key}`,
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
      this.setState({
        message: response.data.message
      })
      console.log('response :', response);
    }).catch(response => console.log('err ', response));
  }
  edit = () => {
    let editedUser = {}
    if (this.state.password !== '' || this.state.email !== this.state.newEmail) {
      editedUser = {
        name: this.state.name,
        last_name: this.state.lastName,
        email: this.state.newEmail,
        password: this.state.password,
        role_id: this.state.role
      }
    } else {
      editedUser = {
        name: this.state.name,
        last_name: this.state.lastName,
        role_id: this.state.role
      }
    }

    this.editUser(editedUser)
  }
  render() {
    // let a = this.props.location.pathname;
    // var res = a.split("/");
    // console.log('res :', res[3]);
    console.log('this.state :', this.state);
    return (
      <div>
        <span>Ime: </span>
        <EditUserName name='name' value={this.state.name} handleChange={this.handleChange} /><br />
        <span>Prezime: </span>
        <EditUserLastName name='lastName' value={this.state.lastName} handleChange={this.handleChange} /><br />
        <span>Email: </span>
        <EditUserEmail name='newEmail' value={this.state.newEmail} handleChange={this.handleChange} /><br />
        <span>Lozinka: </span>
        <Input name='password' value={this.state.password} onChange={this.handleChange} /><br />
        <span>Rola: </span>
        <Dropdown placeholder={this.state.role} item selection options={roles} onChange={this.handleChangeDropRole} value={this.state.role} /><br />
        <Button onClick={this.edit} content='Izmeni' />
      </div>
    )
  }
}
