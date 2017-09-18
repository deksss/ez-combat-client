import React, { Component } from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";

export default class UnitName extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, msgOpen: false };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setInputValue(nextProps.name);
    }
  }

  getInputValue = () => {
    return this.refs.input.value;
  };

  setInputValue = name => {
    if (this.refs.input) {
      this.refs.input.value = name;
    }
  };

  save = () => {
    const value = this.getInputValue();
    if (value !== "") {
      this.setState({
        edit: false,
        msgOpen: false
      });
      this.props.onChange({
        name: value,
        _id: this.props._id
      });
    } else {
      this.setState({
        edit: true,
        msgOpen: true
      });
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.save();
    }
  };

  editOn = () => {
    this.setState({
      edit: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      msgOpen: false
    });
  };

  render() {
    const { name, readOnly } = this.props;
    if (readOnly) {
      return <span>{name}</span>;
    }

    if (this.state.edit) {
      return (
        <div>
          <input
            size="20"
            ref="input"
            defaultValue={name}
            onKeyUp={this.handleKeyUp}
            onBlur={this.save}
          />
          <Snackbar
            open={this.state.msgOpen}
            message="The field name must be non-empty"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      );
    } else {
      return (
        <span onDoubleClick={this.editOn} style={{ minWidth: "150px" }}>
          {name}
        </span>
      );
    }
  }
}
