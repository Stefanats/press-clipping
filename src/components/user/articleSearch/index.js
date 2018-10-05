import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from './datePickerSection';
import PressType from './pressType';
import { Button } from 'semantic-ui-react';
import PressPublisher from './pressPublisher';

@connect(state => ({ proba: state.articleSearch }))

class ArticlesSearch extends Component {
  query = () => {
    console.log('this.props :', this.props.proba);
  }
  render() {
    console.log("IZ REDUXA", this.props.proba)
    return (
      <div>
        <DatePicker text="Od" />
        <DatePicker text="Do" />
        <PressType />
        <PressPublisher />
        <Button content='Send query' onClick={this.query} />
      </div>
    )
  }
}
export default ArticlesSearch;
