import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from './datePickerSection';
import PressType from './pressType';
import { Button } from 'semantic-ui-react';
import PressPublisher from './pressPublisher';
import axios from 'axios';
import Article from './Article'

@connect(state => ({ proba: state.articleSearch }))

class ArticlesSearch extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    this.getToken()
  }
  getToken = () => {
    let token = window.sessionStorage.getItem("token")
    let tokenParse = JSON.parse(token)
    let company_id = tokenParse.company_id
    this.setState({
      company_id
    })
  }

  getArticles(params) {
    let api_key = 'dada';
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/media/search?api_key=${api_key}`,
      data: params
    }).then(response => {
      this.setState({
        articles: response.data.result
      })
      console.log('response :', response.data.result);
    }).catch(err => console.log('err ', err));
  }

  handleSubmit = (e) => {
    let obj = {}
    obj = {
      period: this.props.proba.period,
      company_id: this.state.company_id,
      publisher: this.props.proba.publisher,
      pressType: this.props.proba.pressType
    }
    this.getArticles(obj)
    console.log('obj :', obj);
  }

  render() {
    const { articles } = this.state
    let articlesArr = articles.map((article) => {
      return (
        <Article text={article.text} link={article.link_src} />
      )
    })
    console.log("IZ REDUXA", this.props.proba)
    console.log('this.state :', this.state);
    return (
      <div>
        <DatePicker text="Od" />
        <DatePicker text="Do" />
        <PressType />
        <PressPublisher />
        <Button content='Send query' onClick={this.handleSubmit} />
        {
          articlesArr
        }
      </div>
    )
  }
}
export default ArticlesSearch;
