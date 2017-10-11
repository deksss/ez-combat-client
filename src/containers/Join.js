import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JoinRoom from "../components/JoinRoom";
import RoomsList from "../components/RoomsList";
import { setCurrentRoom, addRoom } from "../actions/rooms";
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
    changeUserId: PropTypes.func.isRequired
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

  render() {
    return (
      <div style={style}>
        <h3 style={{ marginTop: 20 }}>Join the game room</h3>
        <JoinRoom
          value={""}
          onJoin={this.handleJoin}
          addRoom={this.addRoom}
          onJoinMod={this.handleJoinMod}
          rooms={this.props.rooms}
          userId={this.props.userId}
          changeUserId={this.props.changeUserId}
        />
        <h3 style={{ marginTop: 10 }}>Or go to an existing one</h3>
        <RoomsList
          items={this.props.rooms}
          join={this.handleJoin}
          joinAsMod={this.handleJoinMod}
          addRoom={this.handleAddRoom}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Join));
