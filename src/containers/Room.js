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
    d20: state.rolls.d20
  };
};

const mapDispatchToProps = dispatch => ({
  rollD20: () => {
    const roll = randomFace(20);
  //  dispatch(rollD20({ user: "User", roll: roll }));
    dispatch(actionSend(rollD20({ name: "User", roll: roll })));
  }
});

class Room extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const { rollD20, d20 } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader roomId={this.props.roomId} />
          <Npcs admin={false} />
          <br />
          <D20 value={d20.value} name={d20.name} roll={rollD20} />
          <br />
          <Players admin={false} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
