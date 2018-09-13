import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';

import Jedan from './jedan';
import Dva from './dva';
import Tri from './tri';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/jedan" component={Jedan} />
      <Route path="/dva" component={Dva} />
      <Route path="/tri" component={Tri} />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  count: state.count
})

export default connect(mapStateToProps)(Main);