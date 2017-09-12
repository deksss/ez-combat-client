import React, { Component } from "react";
import PropTypes from "prop-types";
import { MAIN_COLOR } from "../styles/constants";
import Snackbar from "material-ui/Snackbar";

export default class FieldName extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, msgOpen: false };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setInputValue(nextProps.name);
    }
  }

  getInputValue = () => {
    return this.refs.input && this.refs.input.value;
  };

  setInputValue = name => {
    if (this.refs.input) {
      this.refs.input.value = name;
    }
  
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const value = this.getInputValue();
      if (value === "") {
        this.setState({
          edit: true,
          msgOpen: true
        });
      } else {
        this.setState({
          edit: false,
          msgOpen: false
        });
        this.props.onChange(value);
      }
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
    const { name } = this.props;

    if (this.state.edit) {
      return (
        <div>
          <input
            size="10"
            ref="input"
            defaultValue={name}
            onKeyUp={this.handleKeyUp}
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
        <div
          onDoubleClick={this.editOn}
          style={{ fontSize: 15, color: MAIN_COLOR, marginRight: 15 }}
        >
          {name}
        </div>
      );
    }
  }
}
