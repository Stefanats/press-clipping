import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from '../user/articleSearch/datePickerSection';
import PressType from '../user/articleSearch/pressType';
import { Button, GridColumn, TextArea, Grid, GridRow } from 'semantic-ui-react';
import PressPublisher from '../user/articleSearch/pressPublisher';
import axios from 'axios';
import { deleteArticle } from './actions/deleteArticle'

@connect(state => ({ proba: state.articleSearch, login: state.login }))

class ArticlesSearchEditor extends Component {
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
        response.data.map((item) => {
          this.setState({
            zajednicki: item.articles
          })
        })
        let tekstz = []
        this.state.zajednicki.map((item) => {
          return tekstz.push({
            id: item.id,
            tekst: item.text
          })
        })
        this.setState({
          tekstovi: tekstz
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
            name: 'Stampani',
            arr: item.articles
          })
        })
        digital.map((item) => {
          return digitalArr.push({
            date: item.date,
            name: "Digitalni",
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

  deleteArticle = (id) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: this.props.proba.pressType,
      press_id: id
    }
    console.log('obj :', obj);
  }
  approveArticle = (id) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: this.props.proba.pressType,
      press_id: id
    }
    console.log('obj :', obj);
  }
  editArticle = (id) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: this.props.proba.pressType,
      press_id: id,
      text: this.state.text
    }
    console.log('obj :', obj);
  }

  deleteArticleObj = (id, name) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: name.toLowerCase(),
      press_id: id
    }
    console.log('obj :', obj);
  }
  approveArticleObj = (id, name) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: name.toLowerCase(),
      press_id: id
    }
    console.log('obj :', obj);
  }
  editArticleObj = (id, name) => {
    let obj = {}
    obj = {
      api_key: 'asdad',
      user_id: this.props.login.id,
      press_type: name.toLowerCase(),
      press_id: id,
      text: this.state.text
    }
    console.log('obj :', obj);
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
    // console.log('id :', id);
    // let arr = this.state.tekstovi
    // arr.map((item) => {
    //   if (item.id === id)
    //     item.tekst = e.target.value
    // })
    // this.setState({
    //   tekstovi: arr
    // })
  }

  handleSubmit = (e) => {
    let obj = {}
    obj = {
      period: this.props.proba.period,
      // company_id: this.state.company_id,
      publisher: this.props.proba.publisher,
      pressType: this.props.proba.pressType,
      role_id: this.props.login.rola
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
    console.log("IZ REDUXA", this.props)
    console.log('ovo trazim :', this.state);
    let arr = this.state.clanci.map((item) => {
      return (
        <Grid style={{ marginTop: '50px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px' }}>{item.date}</div><br />
          <GridRow>
            {
              item.articles.map((article) => {
                return (
                  // <Article text={article.text} link={article.link_src} slug={article.media_slug} time={article.updated_at} />
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>{article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      {/* <div style={{ height: '100px', overflowY: 'scroll', border: '1px solid black' }}>{item.text}</div> */}
                      <TextArea name={article.text} defaultValue={article.text} onChange={ this.handleChange} />
                      <Button onClick={() => this.deleteArticle(article.id)} content='Obrisi' color='red' />
                      <Button onClick={() => this.approveArticle(article.id)} content='Odobri' color='blue' />
                      <Button onClick={() => this.editArticle(article.id)} content='Izmeni' color='grey' />
                    </div>
                  </GridColumn>
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
          <div style={{ fontSize: '20px', textAlign: 'center' }}>{item.name}</div>
          <div style={{ fontSize: '18px', textAlign: 'center' }}>{item.date}</div>
          <GridRow centered>
            {
              item.arr.map((article) => {
                return (
                  <GridColumn computer={4}>
                    {/* <Article text={item.text} slug={item.media_slug} /> */}
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>{article.media_slug}</div>
                      <TextArea name={article.text} defaultValue={article.text} onChange={ this.handleChange} />
                      <Button onClick={() => this.deleteArticleObj(article.id, item.name)} content='Obrisi' color='red' />
                      <Button onClick={() => this.approveArticleObj(article.id, item.name)} content='Odobri' color='blue' />
                      <Button onClick={() => this.editArticleObj(article.id, item.name)} content='Izmeni' color='grey' />
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
          <div style={{ fontSize: '20px', textAlign: 'center' }}>{item.name}</div>
          <div style={{ fontSize: '18px', textAlign: 'center' }}>{item.date}</div>
          <GridRow centered>
            {
              item.arr.map((article) => {
                return (
                  <GridColumn computer={4}>
                    {/* <Article text={item.text} slug={item.media_slug} /> */}
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>{article.media_slug}</div>
                      <TextArea name={article.text} defaultValue={article.text} onChange={ this.handleChange} />
                      <Button onClick={() => this.deleteArticleObj(article.id, item.name)} content='Obrisi' color='red' />
                      <Button onClick={() => this.approveArticleObj(article.id, item.name)} content='Odobri' color='blue' />
                      <Button onClick={() => this.editArticleObj(article.id, item.name)} content='Izmeni' color='grey' />
                    </div>
                  </GridColumn>
                )
              })
            }
          </GridRow>
        </Grid>
      )
    })
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
export default ArticlesSearchEditor;
