import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JoinRoom from "./JoinRoom";
import RoomsList from "./romms_list/index.js";
import { withRouter } from "react-router-dom";
import { Tabs, Tab } from "material-ui";
import SwipeableViews from "react-swipeable-views";
import { MAIN_BG_COLOR } from "../../../styles/constants";
import { joinRoom } from "../../../actions/ws";
import { deleteNpcsByRoomId } from "../../../actions/npcs";
import { deletePlayersByRoomId } from "../../../actions/players";
import { setCurrentRoom, addRoom, deleteRoom } from "../../../actions/rooms";
import { setUserId, mainTabSet, saveStoreToFile } from "../../../actions/index";
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const mapDispatchToProps = dispatch => ({
  setRoom: options => {
    dispatch(setCurrentRoom(options));
  },
  joinRoom: options => {
    dispatch(joinRoom(options));
  },
  addRoom: options => {
    dispatch(addRoom(options));
  },
  changeUserId: userId => {
    dispatch(setUserId(userId.target.value));
  },
  deleteRoom: options => {
    dispatch(deleteRoom(options));
    dispatch(deleteNpcsByRoomId(options));
    dispatch(deletePlayersByRoomId(options));
  },
  mainTabSet: slideIndex => {
    dispatch(mainTabSet(slideIndex));
  },
  saveRoom: options => {
    dispatch(saveStoreToFile(options));
  }
});

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms.list,
  userId: state.user.userId,
  slideIndex: state.mainTabs.slideIndex
});

class Join extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    setRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
    changeUserId: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    mainTabSet: PropTypes.func.isRequired,
    slideIndex: PropTypes.number.isRequired
  };

  handleChageTab = value => {
    this.props.mainTabSet(value);
  };

  handleJoin = options => {
    const id = options._id || "";
    this.props.history.push(`/room/${id}`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleJoinMod = options => {
    const id = options._id || "";

    this.props.history.push(`/roomgm/${id}`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleAddRoom = name => {
    this.props.addRoom(name);
  };

  handleDeleteRoom = options => {
    this.props.deleteRoom(options);
  };

  handleSave = options => {
    this.props.saveRoom(options);
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Tabs
          onChange={this.handleChageTab}
          value={this.props.slideIndex}
          tabItemContainerStyle={{
            color: "#fff",
            backgroundColor: MAIN_BG_COLOR
          }}
        >
          <Tab label="Rooms list" value={0} />
          <Tab label="Join" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.props.slideIndex}
          onChangeIndex={this.handleChageTab}
        >
          <div style={style}>
            <RoomsList
              items={this.props.rooms}
              join={this.handleJoin}
              joinAsMod={this.handleJoinMod}
              addRoom={this.handleAddRoom}
              deleteRoom={this.handleDeleteRoom}
              saveRoom={this.handleSave}
            />
          </div>

          <div style={style}>
            <JoinRoom
              value={""}
              onJoin={this.handleJoin}
              addRoom={this.addRoom}
              onJoinMod={this.handleJoinMod}
              rooms={this.props.rooms}
              userId={this.props.userId}
              changeUserId={this.props.changeUserId}
            />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Join));
