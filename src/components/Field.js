import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonVisible from './ButtonVisible'
import ButtonSettings from './ButtonSettings'
import ButtonDelete from './ButtonDelete'

export default class Field extends Component {
  static propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      visibleToUsers: PropTypes.bool.isRequired,
    }).isRequired,
    onChangeField: PropTypes.func.isRequired,
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.field.value !== this.props.field.value) {
      this.setInputValue(nextProps.field.value)
    }
  }

  getInputValue = () => {
    return this.refs.input.value
  }

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.refs.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.props.onChangeField(this.getInputValue())
    }
  }


  render() {
    const {_id, name, visibleToUsers, value} = this.props.field
    const deleteField = (id) => console.log(`delete ${id}`)
    const fieldSettings = (id) => console.log(`open settings ${id}`)
    const setVisibility = (id, filter) => console.log(`set ${id} visible ${filter}`)

    return (
      <li className="field">
        {name} :
        <input size="15"
               ref="input"
               defaultValue={value}
               onKeyUp={this.handleKeyUp} />
        <ButtonVisible _id={_id}
                       runAction={setVisibility}
                       visibleToUsers={visibleToUsers}/>
        <ButtonSettings _id={_id}
                        runAction={fieldSettings} />
        <ButtonDelete _id={_id}
                      runAction={deleteField} />

      </li>
    )
  }
}
