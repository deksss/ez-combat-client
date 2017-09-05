import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonVisible from "./ButtonVisible";
import ButtonDelete from "./ButtonDelete";
import FieldName from "./FieldName";
import Item from "./Item";
import TextField from "material-ui/TextField";
import { MAIN_COLOR } from "../styles/constants";


export default class Field extends Component {
  static propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      visibleToUsers: PropTypes.bool.isRequired,
      canEdit: PropTypes.bool.isRequired
    }).isRequired,
    onChangeField: PropTypes.func.isRequired
  };

  handleChange = (e, value) => {
    console.log(e);
    console.log(value);
    this.props.onChangeField(value);
  };

  render() {
    const placeholder = "enter value";
    const { _id, name, visibleToUsers, value, canEdit } = this.props.field;
    const deleteField = () => this.props.delete();
    const setVisibility = () => this.props.toggleVisible();
    const changeName = name => this.props.changeName(name);
    if (canEdit) {
      return (
        <Item style={{backgroundColor: visibleToUsers ? "#FFFFFF" : "#C0C0C0"}}>
          <FieldName name={name} onChange={changeName} _id={_id} />
          <TextField
            placeholder={placeholder}
            onChange={this.handleChange}
            multiLine={true}
            rows={1}
            value={value}
            textareaStyle={{ color: MAIN_COLOR }}
            id={`input_${_id}`}
          />

          <ButtonVisible
            _id={_id}
            runAction={setVisibility}
            visibleToUsers={visibleToUsers}
            color={MAIN_COLOR}
          />
          <ButtonDelete _id={_id} runAction={deleteField} color={MAIN_COLOR} />
        </Item>
      );
    } else {
      return (
        <Item>
          <span>{name}:</span>
          <span>{value}</span>
        </Item>
      );
    }
  }
}
