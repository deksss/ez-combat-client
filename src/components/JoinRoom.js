import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

export default class JoinRoom extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onJoin: PropTypes.func.isRequired,
    onJoinMod: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired,
    userId:  PropTypes.string.isRequired,
    changeUserId: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "Property Value"
    };
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
    this.setInputValue(event.target.value)
  };

//  handleChangeUnit = event => {
//    console.log()
//    this.setInputValue(event.target.value)
//  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleJoinClick();
    }
  };
  //need move to top
  handleJoinClick = () => {
    const value = this.getInputValue();
    const data = this.props.rooms.find(room => room._id === value);
    if (data && data.owner_code) {
      this.props.onJoinMod(data);
    } else {
      this.props.onJoin({ _id: value });
    }
    this.setInputValue("");
  };

  render() {
    const placeholder = "enter room ID";
    return (
      <div>
        <div>
          <TextField
            ref={input => {
              this.inputUser = input;
            }}
            value={this.props.userId}
            placeholder={'user ID, must be 5 or more chr'}
            onChange={this.props.changeUserId}
            id="join-user-name"
            style={{width: 300}}
          />
        </div>
        <TextField
          ref={input => {
            this.input = input;
          }}
          onKeyUp={this.handleKeyUp}
          defaultValue={this.props.value}
          placeholder={placeholder}
          onChange={this.handleChange}
          id="join-room-name"
        />
        <RaisedButton
          style={{ margin: "0.5em" }}
          onClick={this.handleJoinClick}
          label="Go"
        />
      </div>
    );
  }
}
