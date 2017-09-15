import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import D20 from "../components/dices/D20";
import { randomFace } from "../common/roller";
import { actionSend } from "../actions/ws";
import { rollD20 } from "../actions/rolls";

const mapStateToProps = state => {
  return {
    roomId: state.rooms.currentId,
    d20: state.rolls.d20,
    userId: state.user.userId
  };
};

const mapDispatchToProps = dispatch => ({
  rollD20: (userId) => {
    const roll = randomFace(20);
    //  dispatch(rollD20({ user: "User", roll: roll }));
    dispatch(actionSend(rollD20({ name: userId, roll: roll })));
  }
});

class Room extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}
  rollD20 = () => this.props.rollD20(this.props.userId)

  render() {
    const { d20 } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader roomId={this.props.roomId} userId={this.props.userId} />
          <Npcs admin={false} />
          <br />
          <D20 value={d20.roll} name={d20.name} rollHandle={this.rollD20} />
          <br />
          <Players admin={false} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
