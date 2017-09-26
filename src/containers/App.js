import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import Helmet from "react-helmet";
import JoinRoom from "../components/JoinRoom";
import RoomsList from "../components/RoomsList";
import { setCurrentRoom, addRoom } from "../actions/rooms";
import { setUserId } from "../actions/index";
import { joinRoom } from "../actions/ws";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MainHeader from "../components/MainHeader"
import Footer from "../components/Footer"

class App extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    children: PropTypes.node,
    setRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
    changeUserId: PropTypes.func.isRequired
  };

  handleJoin = options => {
    browserHistory.push(`/room`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleJoinMod = options => {
    browserHistory.push(`/room/admin`);
    this.props.setRoom(options);
    this.props.joinRoom(options);
  };

  handleAddRoom = name => {
    this.props.addRoom(name);
  };


  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height:"100vh"
          }}
        >
          <Helmet title="EZCombat - RPG BOARD GAME SANDBOX TOOLS" />

          <MainHeader />
          <h3 style={{marginTop: 20}}>Join the game room</h3>
          <JoinRoom
            value={''}
            onJoin={this.handleJoin}
            addRoom={this.addRoom}
            onJoinMod={this.handleJoinMod}
            rooms={this.props.rooms}
            userId={this.props.userId}
            changeUserId={this.props.changeUserId}
          />
          <hr />
          <h3 style={{marginTop: 10}}>Or go to an existing one</h3>
          <RoomsList
            items={this.props.rooms}
            join={this.handleJoin}
            joinAsMod={this.handleJoinMod}
            addRoom={this.handleAddRoom}
          />
          {children}
          <Footer />
        </div>

      </MuiThemeProvider>
    );
  }
}
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
    dispatch(setUserId(userId.target.value))
  }
});

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms.list,
  userId: state.user.userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
