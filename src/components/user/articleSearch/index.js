import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from './datePickerSection';
import PressType from './pressType';
import { Button, GridColumn, TextArea, Grid, GridRow, Loader } from 'semantic-ui-react';
import PressPublisher from './pressPublisher';
import axios from 'axios';
import CryptoJS from 'crypto-js'


@connect(state => ({ proba: state.articleSearch, login: state.login }))

class ArticlesSearch extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: [],
      date: [],
      clanci: [],
      printedArr: [],
      digitalArr: [],
      clanciDigitalni: [],
      clanciStampani: [],
      loader: false,
    }
  }
  componentDidMount() {
    this.getToken()
  }
  getToken = () => {
    let userToken = window.localStorage.getItem('novi token')
    let bytes = CryptoJS.AES.decrypt(userToken.toString(), 'lgitruybcintun');
    let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let company_id = user.company_id
    this.setState({
      company_id
    })
  }

  getArticles(params) {
    this.setState({
      loader: true
    })
    console.log('params :', params);
    let api_key = 'dada';
    axios.request({
      method: 'post',
      url: `https://press-cliping.herokuapp.com/api/media/search?api_key=${api_key}`,
      data: params
    }).then(response => {
      if (Array.isArray(response.data) === true) {
        if (this.props.proba.pressType === 'stampani') {
          console.log('response.niz :', response.data);
          let arrSt = []
          response.data.map((item) => {
            return arrSt.push({
              date: item.date,
              name: 'Stampani',
              articles: item.articles
            })
          })
          this.setState({
            loader: false,
            printedArr: [],
            digitalArr: [],
            clanciDigitalni: [],
            clanciStampani: arrSt
          })
        }
        if (this.props.proba.pressType === 'elektronski') {
          let arrDi = []
          response.data.map((item) => {
            return arrDi.push({
              date: item.date,
              name: 'Elektronski',
              articles: item.articles
            })
          })
          this.setState({
            loader: false,
            clanciStampani: [],
            printedArr: [],
            digitalArr: [],
            clanciDigitalni: arrDi
          })
        }
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
            name: 'Elektronski',
            arr: item.articles
          })
        })
        this.setState({
          loader: false,
          clanciStampani: [],
          clanciDigitalni: [],
          printedArr: printedArr,
          digitalArr: digitalArr
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
    console.log("IZ REDUXA", this.props.proba)
    console.log('this.state.clanaka :', this.state);
    let clanciStampani = this.state.clanciStampani.map((item) => {
      return (
        <Grid style={{ marginTop: '50px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px' }} onClick={this.showArticles}>{item.name + ' ' + item.date}</div><br />
          <GridRow centered>
            {
              item.articles.map((article) => {
                return (
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.original_src} style={{ fontSize: '18px' }} target="_blank">Originalni Pdf</a><br />
                      <a href={article.modified_src} style={{ fontSize: '18px' }} target="_blank">Modifikovani Pdf</a><br />
                      <a href={article.single_page_src} style={{ fontSize: '18px' }} target="_blank">Izdvojena stranica</a><br />
                      <div>Izdavac: {article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      <TextArea cols="35" name={article.text} value={article.text === null ? '' : article.text} /><br />
                    </div>
                  </GridColumn>
                )
              })
            }
          </GridRow>
        </Grid>
      )
    })
    let clanciDigitalni = this.state.clanciDigitalni.map((item) => {
      return (
        <Grid style={{ marginTop: '50px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px' }}
            onClick={this.showArticles}>{item.name + ' ' + item.date}</div><br />
          <GridRow centered>
            {
              item.articles.map((article) => {
                return (
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>Izdavac: {article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      <TextArea cols="35" name={article.text} value={article.text === null ? '' : article.text} /><br />
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
              item.arr.map((item) => {
                return (
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={item.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>Izdavac: {item.media_slug}</div>
                      <div>{item.updated_at}</div>
                      <TextArea cols="35" name={item.text} value={item.text === null ? '' : item.text} /><br />
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
              item.arr.map((item) => {
                return (
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={item.original_src} style={{ fontSize: '18px' }} target="_blank">Originalni Pdf</a><br />
                      <a href={item.modified_src} style={{ fontSize: '18px' }} target="_blank">Modifikovani Pdf</a><br />
                      <a href={item.single_page_src} style={{ fontSize: '18px' }} target="_blank">Izdvojena stranica</a><br />
                      <div>Izdavac: {item.media_slug}</div>
                      <div>{item.updated_at}</div>
                      <TextArea cols="35" name={item.text} value={item.text === null ? '' : item.text} /><br />
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
        <DatePicker text="Od" /><br />
        <DatePicker text="Do" /><br />
        <PressType /><br />
        <PressPublisher /><br />
        <Button color='facebook' content='Pošalji upit' onClick={this.handleSubmit} />
        {this.state.loader === true ? <Loader size='large' active inline='centered' /> : null}
        
        <div>
          {
            clanciStampani
          }
        </div>
        <div>
          {
            clanciDigitalni
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
