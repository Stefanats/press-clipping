import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from './datePickerSection';
import PressType from './pressType';
import { Button, GridColumn, TextArea, Grid, GridRow } from 'semantic-ui-react';
import PressPublisher from './pressPublisher';
import axios from 'axios';
import Article from './Article'


@connect(state => ({ proba: state.articleSearch, login: state.login }))

class ArticlesSearch extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: [],
      date: [],
      clanci: [],
      printedArr: [],
      digitalArr: []
    }
  }
  componentDidMount() {
    this.getToken()
  }
  getToken = () => {
    let token = window.localStorage.getItem("user")
    let tokenParse = JSON.parse(token)
    let company_id = tokenParse.company_id
    this.setState({
      company_id
    })
  }

  getArticles(params) {
    console.log('params :', params);
    let api_key = 'dada';
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/media/search?api_key=${api_key}`,
      data: params
    }).then(response => {
      if (Array.isArray(response.data) === true) {
        console.log('response.niz :', response.data);
        let arr = []
        response.data.map((item) => {
          return arr.push({
            date: item.date,
            articles: item.articles
          })
        })
        this.setState({
          clanci: arr,
          printedArr: [],
          digitalArr: []
        })
      }
      else {
        console.log('response.obj :', response.data);
        let printed = response.data.printed
        let digital = response.data.digitals
        let printedArr = []
        let digitalArr = []
        printed.map((item) => {
          return printedArr.push({
            date: item.date,
            // name: item.slug,
            arr: item.articles
          })
        })
        digital.map((item) => {
          return digitalArr.push({
            date: item.date,
            // name: item.slug,
            arr: item.articles
          })
        })
        this.setState({
          printedArr: printedArr,
          digitalArr: digitalArr,
          clanci: []
        })
      }
    }).catch(err => console.log('err ', err));
  }

  handleSubmit = (e) => {
    let obj = {}
    obj = {
      period: this.props.proba.period,
      company_id: this.state.company_id,
      publisher: this.props.proba.publisher,
      pressType: this.props.proba.pressType,
      role_name: this.props.login.rola,
      id: this.props.login.id
    }
    this.getArticles(obj)
    console.log('obj :', obj);
  }

  render() {
    // const { articles } = this.state
    // let articlesArr = articles.map((article) => {
    //   return (
    //     <Article text={article.text} link={article.link_src} slug={article.media_slug} time={article.updated_at} />
    //   )
    // })
    console.log("IZ REDUXA", this.props.proba)
    console.log('this.state.clanaka :', this.state);
    let arr = this.state.clanci.map((item) => {
      return (
        <Grid style={{ marginTop: '50px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px' }}>{item.date}</div><br />
          <GridRow>
            {
              item.articles.map((article) => {
                return (
                  <Article text={article.text} link={article.link_src} slug={article.media_slug} time={article.updated_at} />
                )
              })
            }
          </GridRow>
        </Grid>
      )
    })
    let digital = this.state.digitalArr.map((item) => {
      return (
        <Grid textAlign='center' style={{ marginTop: '50px' }}>
          {/* <div style={{ fontSize: '20px', textAlign: 'center' }}>{item.name}</div> */}
          <div style={{ fontSize: '18px', textAlign: 'center' }}>{item.date}</div>
          <GridRow centered>
            {
              item.arr.map((item) => {
                return (
                  <GridColumn computer={4}>
                    {/* <Article text={item.text} slug={item.media_slug} /> */}
                    <div style={{ marginTop: '50px' }}>
                      <a href={item.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>{item.media_slug}</div>
                      <div style={{ height: '100px', overflowY: 'scroll', border: '1px solid black' }}>{item.text}</div>
                    </div>
                  </GridColumn>
                )
              })
            }
          </GridRow>
        </Grid>
      )
    })
    let printed = this.state.printedArr.map((item) => {
      return (
        <Grid textAlign='center' style={{ marginTop: '50px' }}>
          {/* <div style={{ fontSize: '20px', textAlign: 'center' }}>{item.name}</div> */}
          <div style={{ fontSize: '18px', textAlign: 'center' }}>{item.date}</div>
          <GridRow centered>
            {
              item.arr.map((item) => {
                return (
                  <GridColumn computer={4}>
                    {/* <Article text={item.text} slug={item.media_slug} /> */}
                    <div style={{ marginTop: '50px' }}>
                      <a href={item.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>{item.media_slug}</div>
                      <div style={{ height: '100px', overflowY: 'scroll', border: '1px solid black' }}>{item.text}</div>
                    </div>
                  </GridColumn>
                )
              })
            }
          </GridRow>
        </Grid>
      )
    })
    console.log('this.state.clanaka :', this.state);

    return (
      <div>
        <DatePicker text="Od" />
        <DatePicker text="Do" />
        <PressType />
        <PressPublisher />
        <Button content='Send query' onClick={this.handleSubmit} />
        <div>
          {
            arr
          }
        </div>
        <div>
          {
            digital
          }
        </div>
        <div>
          {
            printed
          }
        </div>
      </div>
    )
  }
}
export default ArticlesSearch;
