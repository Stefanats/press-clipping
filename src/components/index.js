import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import User from './user';
import Admin from './Admin';
import Editor from './Editor';
import Operator from './Operator';
import NavBar from './navBar';
import UserNavBar from './user/UserNavBar';
import EditorNavBar from './editor/EditorNavBar';
import OperatorNavBar from './operator/OperatorNavBar';
import HomeNavBar from './HomeNavBar'
import Home from './home';
import NotFound from './notFound';
import CreateUser from './user/createCompanyAndUser/CreateUser';
import CreateCompany from './user/createCompanyAndUser/CreateCompany';
import Companies from './edit/Companies';
import EditCompany from './edit/EditCompany'
import Edit from './edit/Edit'
import ChooseCompany from './edit/ChooseCompany'
import EditUser from './edit/EditUser'
import EditSingleUser from './edit/EditSingleUser'
import EditArticle from './operator/EditArticle'

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (

  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const Main = () => (
  <BrowserRouter>
    <Switch>
      <AppRoute layout={HomeNavBar} exact path="/" component={Home} />
      <AppRoute layout={UserNavBar} exact path="/user" component={User} />
      <AppRoute layout={NavBar} exact path="/admin" component={Admin} />
      <AppRoute layout={EditorNavBar} exact path="/editor" component={Editor} />
      <AppRoute layout={OperatorNavBar} exact path="/operator" component={Operator} />
      <AppRoute layout={OperatorNavBar} exact path="/operator/editArticle/:itemName/:id" component={EditArticle} />
      <AppRoute layout={NavBar} exact path="/createUser" component={CreateUser} />
      <AppRoute layout={NavBar} exact path="/createCompany" component={CreateCompany} />
      <AppRoute layout={NavBar} exact path="/edit" component={Edit} />
      <AppRoute layout={NavBar} exact path="/edit/companies" component={Companies} />
      <AppRoute layout={NavBar} exact path="/edit/companies/:id" component={EditCompany} />
      <AppRoute layout={NavBar} exact path="/edit/choose_company" component={ChooseCompany} />
      <AppRoute layout={NavBar} exact path="/edit/choose_company/:id" component={EditUser} />
      <AppRoute layout={NavBar} exact path="/edit/choose_company/:id/:id" component={EditSingleUser} />
      <AppRoute layout={NavBar} exact component={NotFound} />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  count: state.count
})

export default connect(mapStateToProps)(Main);