import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import User from './user';
import Dva from './dva';
import Tri from './tri';
import NavBar from './navBar';
import Home from './home';
import NotFound from './notFound';
import CreateUser from './user/createCompanyAndUser/CreateUser';
import CreateCompany from './user/createCompanyAndUser/CreateCompany';

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
      <AppRoute layout={NavBar} exact path="/" component={Home} />
      <AppRoute layout={NavBar} exact path="/user" component={User} />
      <AppRoute layout={NavBar} exact path="/dva" component={Dva} />
      <AppRoute layout={NavBar} exact path="/tri" component={Tri} />
      {/* <AppRoute layout={NavBar} exact component={NotFound} /> */}
      <AppRoute layout={NavBar} exact path="/createUser" component={CreateUser} />
      <AppRoute layout={NavBar} exact path="/createCompany" component={CreateCompany} />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  count: state.count
})

export default connect(mapStateToProps)(Main);