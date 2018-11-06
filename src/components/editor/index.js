import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from '../user/articleSearch/datePickerSection';
import PressType from '../user/articleSearch/pressType';
import { Button, GridColumn, TextArea, Grid, GridRow, Input, Loader, Dimmer, Header } from 'semantic-ui-react';
import PressPublisher from '../user/articleSearch/pressPublisher';
import axios from 'axios';
import CryptoJS from 'crypto-js'


@connect(state => ({ proba: state.articleSearch, login: state.login }))

class ArticlesSearchEditor extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: [],
      date: [],
      clanci: [],
      printedArr: [],
      digitalArr: [],
      clanciStampani: [],
      clanciDigitalni: [],
      text: '',
      loader: false,
      show: true,
      display: 'none',
      deleteMsg: '',
      approveMsg: ''
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
  showArticles = () => {
    this.setState({
      show: !this.state.show
    })
    if (this.state.show === true) {
      this.setState({
        display: 'block'
      })
    }
    if (this.state.show === false) {
      this.setState({
        display: 'none'
      })
    }

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
        console.log('response.data :', response.data)
        if (this.props.proba.pressType === 'stampani') {
          console.log('stampani :');
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
            clanciDigitalni: [],
            printedArr: [],
            digitalArr: [],
            clanciStampani: arrSt
          })
        }
        if (this.props.proba.pressType === 'elektronski') {
          console.log('digitalni :');
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
            name: "Elektronski",
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

  backArticle = (id, c_id) => {
    let api_key = 'dada';
    let obj = {}
    obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      press_type: this.props.proba.pressType,
      press_id: id,
      company_id: c_id
    }
    console.log('obj :', obj);
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/editorDisallow?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        console.log('response :', response);
        if (response.data.success === true) {
          this.setState({
            deleteMsg: 'Vratili ste clanak Operatoru!',
            active: true,
            Active: false
          })
        }
        setTimeout(() => {
          this.setState({
            active: false
          })
        }
          , 2000)
      })
  }
  approveArticle = (id, c_id) => {
    let api_key = 'dada';
    let obj = {}
    obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      press_type: this.props.proba.pressType,
      press_id: id,
      company_id: c_id
    }
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/editorAllow?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        console.log('response :', response);
        if (response.data.success === true) {
          this.setState({
            approveMsg: 'Clanak poslat korisniku!',
            Active: true,
            active: false
          })
        }
        setTimeout(() => {
          this.setState({
            Active: false
          })
        }
          , 2000)
      })
    console.log('obj :', obj);
  }
  backArticleObj = (id, name, c_id) => {
    let api_key = 'dada';
    let obj = {}
    obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      press_type: name.toLowerCase(),
      press_id: id,
      company_id: c_id
    }
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/editorDisallow?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        console.log('response :', response);
        if (response.data.success === true) {
          this.setState({
            deleteMsg: 'Vratili ste clanak Operatoru!',
            active: true,
            Active: false
          })
        }
        setTimeout(() => {
          this.setState({
            active: false
          })
        }
          , 2000)
      })
    console.log('obj :', obj);
  }
  approveArticleObj = (id, name, c_id) => {
    let api_key = 'dada';
    let obj = {}
    obj = {
      id: this.props.login.id,
      role_name: this.props.login.rola,
      press_type: name.toLowerCase(),
      press_id: id,
      company_id: c_id
    }
    axios.request({
      method: 'put',
      url: `https://press-cliping.herokuapp.com/api/editorAllow?api_key=${api_key}`,
      data: obj
    })
      .then(response => {
        console.log('response :', response);
        if (response.data.success === true) {
          this.setState({
            approveMsg: 'Clanak poslat korisniku!',
            Active: true,
            active: false
          })
        }
        setTimeout(() => {
          this.setState({
            Active: false,
          })
        }
          , 2000)
      })
    console.log('obj :', obj);
  }

  handleSubmit = (e) => {
    let obj = {}
    obj = {
      period: this.props.proba.period,
      publisher: this.props.proba.publisher,
      pressType: this.props.proba.pressType,
      id: this.props.login.id,
      role_name: this.props.login.rola
    }
    this.getArticles(obj)
    console.log('obj :', obj);
  }

  render() {
    console.log("IZ REDUXA", this.props)
    console.log('ovo trazim :', this.state);
    const { active, Active } = this.state

    let clanciStampani = this.state.clanciStampani.map((item) => {
      return (
        <Grid style={{ marginTop: '50px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px' }} onClick={this.showArticles}>{item.name + ' ' + item.date}</div><br />
          <GridRow>
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
                      <Button onClick={() => this.backArticle(article.id, article.company_id)} content='Vrati operateru' color='google plus' />
                      <Button onClick={() => this.approveArticle(article.id, article.company_id)} content='Odobri' color='green' />

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
          <GridRow>
            {
              item.articles.map((article) => {
                return (
                  <GridColumn computer={4}>
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>Izdavac: {article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      <TextArea cols="35" name={article.text} value={article.text === null ? '' : article.text} /><br />
                      <Button onClick={() => this.backArticle(article.id, article.company_id)} content='Vrati operateru' color='google plus' />
                      <Button onClick={() => this.approveArticle(article.id, article.company_id)} content='Odobri' color='green' />

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
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.link_src} style={{ fontSize: '18px' }} target="_blank">Link</a>
                      <div>Izdavac: {article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      <TextArea cols="35" name={article.text} value={article.text === null ? '' : article.text} /><br />
                      <Button onClick={() => this.backArticleObj(article.id, item.name, article.company_id)} content='Vrati operateru' color='google plus' />
                      <Button onClick={() => this.approveArticleObj(article.id, item.name, article.company_id)} content='Odobri' color='green' />

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
                    <div style={{ marginTop: '50px' }}>
                      <a href={article.original_src} style={{ fontSize: '18px' }} target="_blank">Originalni Pdf</a><br />
                      <a href={article.modified_src} style={{ fontSize: '18px' }} target="_blank">Modifikovani Pdf</a><br />
                      <a href={article.single_page_src} style={{ fontSize: '18px' }} target="_blank">Izdvojena stranica</a><br />
                      <div>Izdavac: {article.media_slug}</div>
                      <div>{article.updated_at}</div>
                      <TextArea cols="35" name={article.text} value={article.text === null ? '' : article.text} /><br />
                      <Button onClick={() => this.backArticleObj(article.id, item.name)} content='Vrati operatoru' color='google plus' />
                      <Button onClick={() => this.approveArticleObj(article.id, item.name)} content='Odobri' color='green' />

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
        <DatePicker text="Od" /><br />
        <DatePicker text="Do" /><br />
        <PressType /><br />
        <PressPublisher /><br />
        <Button color='facebook' content='Posalji upit' onClick={this.handleSubmit} />
        {this.state.loader === true ? <Loader size='large' active inline='centered' /> : null}
        <Dimmer active={active} page>
          <Header inverted>
            {this.state.deleteMsg}
          </Header>
        </Dimmer>
        <Dimmer active={Active} page>
          <Header inverted>
            {this.state.approveMsg}
          </Header>
        </Dimmer>
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
export default ArticlesSearchEditor;
