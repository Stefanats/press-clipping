import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from './datePickerSection';
import PressType from './pressType';

@connect(state => ({ proba: state.articleSearch }))

class ArticlesSearch extends Component {
  render() {
    console.log("IZ REDUXA", this.props.proba)
    return (
      <div>
        <DatePicker text="Od" />
        <DatePicker text="Do" />
        <PressType />
      </div>
    )
  }
}
export default ArticlesSearch;
