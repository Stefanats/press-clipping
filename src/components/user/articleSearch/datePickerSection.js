import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect(state => ({ count: state.count }))

class DatePickerSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      date: '',
    };
  }
  componentDidMount = () => {
    let date = moment().format("DD-MMM-YYYY")
    this.setState({
      date
    })
  }
  handleChange = (date) => {
    let newDate = moment(date._d).format("DD-MMM-YYYY")
    this.setState({
      date: newDate
    })
    this.props.text === "Od" ?
      this.props.dispatch({type: "SET_FROM", from: newDate}) :
      this.props.dispatch({type: "SET_TO", to: newDate})
    this.toggleCalendar()
  }
  toggleCalendar = (e) => {
    e && e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    return (
      <div style={{ margin: "5px" }}>
        <Button
          onClick={this.toggleCalendar}>
          {this.state.date}
        </Button>
        {
          this.state.isOpen && (
            <DatePicker
              onClickOutside={this.handleChange}
              onChange={this.handleChange}
              withPortal
              inline />
          )
        }
      </div>
    )
  }
}
export default DatePickerSection;
