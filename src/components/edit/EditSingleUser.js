import React, { Component } from 'react'
import axios from 'axios';
import EditUserName from './editUser/EditUserName'
import EditUserLastName from './editUser/EditUserLastName'
import EditUserEmail from './editUser/EditUserEmail'
import { Button } from 'semantic-ui-react';

export default class EditSingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: ''
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
          email: response.data.user.email
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
    editedUser = {
      name: this.state.name,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
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
        <EditUserLastName name='email' value={this.state.email} handleChange={this.handleChange} /><br />
        <span>Lozinka: </span>
        <EditUserEmail name='password' value={this.state.password} handleChange={this.handleChange} /><br />
        <Button onClick={this.edit} content='Izmeni' />
      </div>
    )
  }
}
