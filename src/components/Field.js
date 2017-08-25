import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonVisible from './ButtonVisible'
import ButtonDelete from './ButtonDelete'
import FieldName from './FieldName'
import Item from './Item'

export default class Field extends Component {
  static propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      visibleToUsers: PropTypes.bool.isRequired,
      canEdit: PropTypes.bool.isRequired
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
    const {_id, name, visibleToUsers, value, canEdit} = this.props.field
    const deleteField = () => this.props.delete()
    const setVisibility = () => this.props.toggleVisible()
    const changeName = (name) => this.props.changeName(name)
    if (canEdit) {
      return (
          <Item>
            <FieldName name={name}
                      onChange={changeName}
                      _id={_id}/>
            <input size="15"
                   ref="input"
                   defaultValue={value}
                   onKeyUp={this.handleKeyUp} />
            <ButtonVisible _id={_id}
                           runAction={setVisibility}
                           visibleToUsers={visibleToUsers}/>
            <ButtonDelete _id={_id}
                          runAction={deleteField} />

          </Item>
      )
    } else {
      return (
        <Item>
          <span>{name}:</span>
          <span>{value}</span>
        </Item>
     )
    }

  }
}
