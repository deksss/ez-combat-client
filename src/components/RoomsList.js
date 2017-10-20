import React, { Component } from "react";
import PropTypes from "prop-types";
import RoomsListItem from "./RoomsListItem";
import { List } from "material-ui/List";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MAIN_BG_COLOR, MAIN_COLOR } from "../styles/constants";

class RoomsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired,
    joinAsMod: PropTypes.func.isRequired,
    addRoom: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ""
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
    this.setInputValue(event.target.value);
  };

  handleAddRoom = () => {
    this.props.addRoom(this.getInputValue());
    this.setInputValue("");
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleAddRoom();
    }
  };

  renderItem = roomItem => {
    const room = Object.assign({}, roomItem, {
      joinHandler: this.props.join,
      modJoinHandler: this.props.joinAsMod,
      deleteHandler: this.props.deleteRoom,
    });

    return <RoomsListItem room={room} key={room._id} />;
  };

  render() {
    const { items } = this.props;
    const placeholder = "For add new room enter name here";

    return (
      <div>
        <h4
          style={{ paddingTop: "20px", textAlign: "center", color: MAIN_COLOR }}
        >
          Rooms:
        </h4>
        <TextField
          ref={input => {
            this.input = input;
          }}
          onKeyUp={this.handleKeyUp}
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.handleChange}
          id="join-room-go"
        />
        <FloatingActionButton
          mini={true}
          style={{ margin: "5px" }}
          onClick={this.handleAddRoom}
          labelColor={"#ffffff"}
          backgroundColor={MAIN_BG_COLOR}
        >
          <ContentAdd />
        </FloatingActionButton>
        <List>{items.map(this.renderItem)}</List>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(RoomsList);
