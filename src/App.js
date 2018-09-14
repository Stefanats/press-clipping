import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//components
import Main from './components/index';
import reducer from './reducers/index';

class App extends Component {
  render () {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
