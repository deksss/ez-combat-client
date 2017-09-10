import React, { Component } from "react";
import PropTypes from "prop-types";

export default class UnitPermission extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  static propTypes = {
    permission: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.permission !== this.props.permission) {
      this.setInputValue(nextProps.permission);
    }
  }

  getInputValue = () => {
    return this.refs.input.value;
  };

  setInputValue = permission => {
    this.refs.input.value = permission;
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const value = this.getInputValue();
      if (value !== "") {
        this.setState({
          edit: false,
        });
        this.props.onChange({
          permission: value,
          _id: this.props._id
        });
      } else {
        this.setState({
          edit: true,
        });
      }
    }
  };

  editOn = () => {
    this.setState({
      edit: true
    });
  };


  render() {
    const { permission } = this.props;

    if (this.state.edit) {
      return (
        <div>
          <input
            size="20"
            ref="input"
            defaultValue={permission}
            onKeyUp={this.handleKeyUp}
          />
        </div>
      );
    } else {
      return (
        <span onDoubleClick={this.editOn}>
          prm
        </span>
      );
    }
  }
}
