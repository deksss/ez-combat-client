import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import D20 from "../components/dices/D20";
import { randomFace, roll } from "../common/roller";
import { rollD20, rollCustom } from "../actions/rolls";
import RollList from "../components/dices/RollList";
import CustomRoller from "../components/dices/CustomRoller";

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

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}
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

          <div style={{ display: "flex", heigh: "180px", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CustomRoller rollHandle={this.rollCustom} />
              <RollList list={rollsLog || []} />
            </div>
            <D20
              value={d20.roll}
              name={d20.name}
              rollHandle={this.rollD20}
              date={d20.date}
            />
          </div>

          <Players admin={false} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
