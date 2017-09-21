import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line
import "./custom.css";
import TextField from "material-ui/TextField";

class CustomRoller extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  getInputValue = () => {
    return this.state.value;
  };

  setInputValue = val => {
    this.setState({
      value: val
    });
  };

  handleChange = event => {
    this.setInputValue(event.target.value);
  };

  handleRollClick = () => {
    const value = this.getInputValue();
    this.props.rollHandle(value);
    //this.setInputValue('');
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleRollClick();
    }
  };

  render() {


    return (
      <div className="dice-custom-form">
        <TextField
          ref={input => {
            this.input = input;
          }}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
          value={this.state.value}
          id="custom-roll-input"
          floatingLabelText="Roll(like: 2d6 + d10 + 2)"
        />
      </div>
    );
  }
}

CustomRoller.propTypes = {
  rollHandle: PropTypes.func.isRequired
};

export default CustomRoller;
