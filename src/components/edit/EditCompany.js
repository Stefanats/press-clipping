import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js'


@connect(state => ({ login: state.login }))

export default class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      delKeywords: [],
      addedKeywords: [],
      editedKeywords: [],
      keyword: '',
      name: '',
      message: ''
    }
  }
  componentDidMount() {
    this.getCompany()
  }
  getCompany = () => {
    let api_key = 'dada';
    let userToken = window.localStorage.getItem('novi token')
    let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
    let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log('user :', user);
    let obj = {}
    obj = {
      company_id: this.props.match.params.id,
      id: user.user_id,
      role_name: user.role_name
    }
    console.log('obj :', obj);
    axios({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/companiesGetOne?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        let arr = []
        response.data.company.keywords.map((item) => {
          return arr.push({
            id: item.id,
            name: item.name
          })
        })
        this.setState({
          id: response.data.company.id,
          name: response.data.company.name,
          keywords: arr
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleChangeKeyword = (id, e) => {
    console.log('id :', id);
    let arr = this.state.keywords;
    arr.map((item) => {
      if (item.id === id)
        item.name = e.target.value
    })
    this.setState({
      keywords: arr
    })
  }
  onDelete = (id) => {
    let keywords = this.state.keywords
    let obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      keyword_id: id
    }
    const filteredKeywords = keywords.filter(keyword => {
      return keyword.id !== id;
    })
    this.setState({
      keywords: filteredKeywords
    })
    let api_key = 'dada';
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/keywordDelete?api_key=${api_key}`,
      data: obj
    }).then(response => {
      if (response.data.success === true) {
        this.setState({
          message: 'Obrisali ste kljucnu rec!'
        })
      }

      console.log('response :', response);
    }).catch(err => console.log('err ', err));
  }
  pushKeyword = () => {
    let keywords = this.state.addedKeywords;
    keywords.push({
      name: this.state.keyword
    })
    this.setState({
      keyword: ''
    })
  }

  editCompany = (editedCompany) => {
    let api_key = 'dada';
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/companies?api_key=${api_key}`,
      data: editedCompany
    })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            message: 'Kompanija editovana!'
          })
        }
        console.log('response :', response);
      }).catch(response => console.log('err ', response));
  }
  edit = () => {
    let editedCompany = {}
    editedCompany = {
      name: this.state.name,
      keywords: this.state.keywords,
      addedKeywords: this.state.addedKeywords,
      role_name: this.props.login.rola,
      id: this.props.login.id,
      company_id: this.props.match.params.id
    }
    this.editCompany(editedCompany)
    console.log('editedCompany :', editedCompany);
    console.log('typeOf() :', typeof (editedCompany));
  }
  render() {
    console.log('this.state :', this.state);
    console.log('this.propsaaaaaaaaaad :', this.props);

    let { name, keywords, addedKeywords } = this.state
    const words = addedKeywords.map((item) => {
      return (
        <ul>
          <li key={item}>{item.name}</li>
        </ul>
      )
    })
    return (
      <div style={{ padding: '50px' }}>
        <h2>Edituj kompaniju</h2>
        <span style={{ fontSize: '16px' }}>Ime kompanije:</span><br />
        <Input name='name' value={name} onChange={this.handleChange} /><br /><br />
        <span style={{ fontSize: '16px' }}>Kljucne reci:</span><br />
        {
          keywords !== undefined ? keywords.map((item, key) => {
            return (
              <div key={item.id} style={{ padding: '2px 0px' }}>
                <Input name={item.name} value={item.name}
                  onChange={(e) => this.handleChangeKeyword(item.id, e)} style={{ minWidth: '100px', paddingRight: '10px' }} />
                <Button onClick={() => this.onDelete(item.id)} content='Obriši' color='google plus' />
                <br />
              </div>
            )
          }) : ''
        }
        <span style={{ fontSize: '16px', paddingTop: '10px', display: 'inline-block' }}>Dodaj kljucnu rec:</span><br />
        <Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
        <Button content='+' onClick={this.pushKeyword} />
        {
          words
        }
        <br /><br />
        <div style={{ fontSize: '16px' }}>{this.state.message}</div><br />
        <Button color='red' content='Sacuvaj' onClick={this.edit} />
      </div>
    )
  }
}
