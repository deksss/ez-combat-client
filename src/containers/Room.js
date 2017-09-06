import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";

const mapStateToProps = state => {
  return {
    roomId: state.rooms.currentId
  };
};

class Room extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader roomId={this.props.roomId} />
          <Npcs admin={false} />
          <hr />
          <Players admin={false} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(Room);
