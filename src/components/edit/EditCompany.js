import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios';

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
    let company_id = this.props.match.params.id;
    axios({
      method: 'get',
      url: `https://press-cliping.herokuapp.com/api/companies/${company_id}?api_key=${api_key}`,
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
    const filteredKeywords = keywords.filter(keyword => {
      return keyword.id !== id;
    })
    this.setState({
      keywords: filteredKeywords
    })
    let api_key = 'dada';
    axios.request({
      method: 'delete',
      url: `https://press-cliping.herokuapp.com/api/keywords/${id}?api_key=${api_key}`,
      // data: companyId
    }).then(response => {
      this.setState({
        message: response.data.message
      })
      console.log('response :', response);
    }).catch(err => console.log('err ', err));
  }
  // onDelete = (id) => {
  //   let c_id = this.props.match.params.id
  //   let delKeywords = this.state.delKeywords
  //   let keywords = this.state.keywords
  //   let deletedKeyword = {};
  //   deletedKeyword = {
  //     company_id: c_id,
  //     keyword_id: id
  //   }
  //   delKeywords.push(deletedKeyword)
  //   const filteredKeywords = keywords.filter(keyword => {
  //     return keyword.id !== id;
  //   })
  //   this.setState({
  //     keywords: filteredKeywords
  //   })
  //   console.log('delKeywords :', this.state);
  // }
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
    let company_id = this.props.match.params.id;
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/companies/${company_id}?api_key=${api_key}`,
      data: editedCompany
    }).then(response => {
      this.setState({
        message: response.data.message
      })
      console.log('response :', response);
    }).catch(response => console.log('err ', response));
  }
  edit = () => {
    let editedCompany = {}
    editedCompany = {
      name: this.state.name,
      keywords: this.state.keywords,
      addedKeywords: this.state.addedKeywords
    }
    this.editCompany(editedCompany)
    console.log('editedCompany :', editedCompany);
    console.log('typeOf() :', typeof (editedCompany));
  }
  render() {
    console.log('this.state :', this.state);
    let { name, keywords, addedKeywords } = this.state
    const words = addedKeywords.map((item) => {
      return (
        <ul>
          <li key={item}>{item.name}</li>
        </ul>
      )
    })
    return (
      <div>
        <h2>Edituj kompaniju</h2>
        <span>Ime kompanije:</span>
        <Input name='name' value={name} onChange={this.handleChange} /><br />
        <span>Kljucne reci:</span><br />
        {
          keywords !== undefined ? keywords.map((item, key) => {
            return (
              <div key={item.id}>
                <Input name={item.name} defaultValue={item.name}
                  onChange={(e) => this.handleChangeKeyword(item.id, e)} />
                <Button onClick={() => this.onDelete(item.id)} content='Delete' />
                <br />
              </div>
            )
          }) : ''
        }
        <span>Dodaj kljucnu rec:</span>
        <Input name='keyword' value={this.state.keyword} onChange={this.handleChange} />
        <Button content='+' onClick={this.pushKeyword} />
        {
          words
        }
        <br />
        <div>{this.state.message}</div><br />
        <Button color='red' content='Sacuvaj' onClick={this.edit} />
      </div>
    )
  }
}
