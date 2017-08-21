import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FieldName extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setInputValue(nextProps.name)
    }
  }

  getInputValue = () => {
    return this.refs.input.value
  }

  setInputValue = (name) => {
    this.refs.input.value = name
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        edit: false
      });
      this.props.onChange(this.getInputValue())
    }
  }

  editOn = () =>  {
    this.setState({
      edit: true
    });
  }


  render() {
    const {name} = this.props

    if (this.state.edit) {
      return (
        <input size="10"
               ref="input"
               defaultValue={name}
               onKeyUp={this.handleKeyUp} />
      )
    } else {
      return (
        <span onDoubleClick={this.editOn}
            style={{minWidth: '50px' }}>
        {name}
        </span>
      )
    }

  }
}
