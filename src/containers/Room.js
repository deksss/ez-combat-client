import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import DiceMain from "../components/dices/DiceMain";
import { randomFace, roll } from "../common/roller";
import { rollD20, rollCustom } from "../actions/rolls";

const mapStateToProps = state => {
  return {
    roomId: state.rooms.currentId,
    d20: state.rolls.d20,
    userId: state.user.userId,
    rollsLog: state.rolls.log
  };
};

const mapDispatchToProps = dispatch => ({
  rollD20: userId => {
    const roll = randomFace(20);
    dispatch(rollD20({ name: userId, roll: roll }));
  },
  customRoll: (rawString, userId) => {
    const result = roll(rawString);
    if (result.res && result.type) {
      dispatch(
        rollCustom({
          name: userId,
          rolls: result.res,
          types: result.type,
          rawString: rawString
        })
      );
    }
  }
});

class Room extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    rollsLog: PropTypes.array.isRequired
  };

  rollD20 = () => this.props.rollD20(this.props.userId);
  rollCustom = rawString => this.props.customRoll(rawString, this.props.userId);

  render() {
    const { d20, rollsLog } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader
            roomId={this.props.roomId}
            userId={this.props.userId}
            toggleSettings={() => {}}
          />

          <Npcs admin={false} />

          <DiceMain
            customRoll={this.rollCustom}
            d20={d20}
            rollD20={this.rollD20}
            rollsLog={rollsLog || []}
          />

          <Players admin={false} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
