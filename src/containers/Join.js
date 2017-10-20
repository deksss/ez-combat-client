import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JoinRoom from "../components/JoinRoom";
import RoomsList from "../components/RoomsList";
import { setCurrentRoom, addRoom, deleteRoom } from "../actions/rooms";
import { setUserId } from "../actions/index";
import { joinRoom } from "../actions/ws";
import { withRouter } from "react-router-dom";

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
    dispatch(deleteRoom(options))
  }
});

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms.list,
  userId: state.user.userId
});

class Join extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    setRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
    changeUserId: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
  };

  handleJoin = options => {
    const id = options._id || "";
    this.props.history.push(`/${id}`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleJoinMod = options => {
    const id = options._id || "";

    this.props.history.push(`/admin/${id}`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleAddRoom = name => {
    this.props.addRoom(name);
  };

  handleDeleteRoom = options => {
    this.props.deleteRoom(options);
  };

  render() {
    return (
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
        <RoomsList
          items={this.props.rooms}
          join={this.handleJoin}
          joinAsMod={this.handleJoinMod}
          addRoom={this.handleAddRoom}
          deleteRoom={this.handleDeleteRoom}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Join));
