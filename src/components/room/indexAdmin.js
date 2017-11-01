import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./players/index";
import Npcs from "./npcs/index";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "./Header";
import DiceMain from "../dices/index";
import { randomFace, roll } from "../../common/roller";
import { rollD20, rollCustom } from "../../actions/rolls";
import GeneralSettings from "./settings/General";
import {
  settingsToggle,
  saveStoreToFile,
  loadStoreFromJson
} from "../../actions";

const mapStateToProps = state => {
  return {
    roomId: state.rooms.currentId,
    showGeneralSettings: state.sidebar.showGeneralSettings,
    d20: state.rolls.d20,
    userId: state.user.userId,
    rollsLog: state.rolls.log
  };
};

const mapDispatchToProps = dispatch => ({
  toggleSettings: () => dispatch(settingsToggle()),
  saveStoreToFile: () => {
    dispatch(saveStoreToFile());
  },
  loadFromFile: data => {
    dispatch(loadStoreFromJson(data));
  },
  rollD20: () => {
    const roll = randomFace(20);
    dispatch(rollD20({ name: "GM", roll: roll }));
  },
  customRoll: rawString => {
    const result = roll(rawString);
    if (result.res && result.type) {
      dispatch(
        rollCustom({
          name: "GM",
          rolls: result.res,
          types: result.type,
          rawString: rawString
        })
      );
    }
  }
});

class RoomAdmin extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    d20: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    customRoll: PropTypes.func.isRequired
  };

  render() {
    const {
      showGeneralSettings,
      toggleSettings,
      saveStoreToFile,
      loadFromFile,
      rollD20,
      d20,
      customRoll,
      rollsLog
    } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader
            roomId={this.props.roomId}
            toggleSettings={toggleSettings}
            userId={this.props.userId}
          />

          <Npcs admin={true} />

          <DiceMain
            customRoll={customRoll}
            d20={d20}
            rollD20={rollD20}
            rollsLog={rollsLog}
          />

          <Players admin={true} />

          <GeneralSettings
            showGeneralSettings={showGeneralSettings}
            close={toggleSettings}
            save={saveStoreToFile}
            load={loadFromFile}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomAdmin);
