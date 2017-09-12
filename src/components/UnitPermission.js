import React, { Component } from "react";
import PropTypes from "prop-types";
import {MAIN_COLOR } from '../styles/constants';
import Accessibility from 'material-ui/svg-icons/action/accessibility';
import IconButton from "material-ui/IconButton";
import styles from "../styles/IconStyles";

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
            size="50"
            ref="input"
            defaultValue={permission}
            onKeyUp={this.handleKeyUp}
          />
        </div>
      );
    } else {
      return (
        <IconButton
          onClick={this.editOn}
          iconStyle={Object.assign({}, styles.smallIcon, {color: MAIN_COLOR})}
          style={styles.small}>
          <Accessibility />
        </IconButton>

      );
    }
  }
}
