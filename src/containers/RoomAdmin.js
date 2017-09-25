import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import { connect } from "react-redux";
import {
  templatesToggle,
  settingsToggle,
  saveStoreToFile,
  loadStoreFromJson
} from "../actions";
import { rollD20, rollCustom } from "../actions/rolls";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import GeneralSettings from "./GeneralSettings";
import D20 from "../components/dices/D20";
import RollList from "../components/dices/RollList";
import { randomFace, roll } from "../common/roller";
import CustomRoller from "../components/dices/CustomRoller";


const mapStateToProps = state => {
  return {
    showTemplates: state.templates.showTemplates,
    roomId: state.rooms.currentId,
    showGeneralSettings: state.sidebar.showGeneralSettings,
    d20: state.rolls.d20,
    userId: state.user.userId,
    rollsLog: state.rolls.log
  };
};

const mapDispatchToProps = dispatch => ({
  templatesToggleClick: () => {
    dispatch(templatesToggle());
  },
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
    /*  dispatch(
      rollCustom({
        name: "Admin",
        rolls: result.res,
        types: result.type,
        rawString: rawString
      })
    );*/
  }
});

class RoomAdmin extends Component {
  static propTypes = {
    showTemplates: PropTypes.bool.isRequired,
    roomId: PropTypes.string.isRequired,
    d20: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    customRoll: PropTypes.func.isRequired
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  handleTemplatesToggle = () => {
    this.props.templatesToggleClick();
  };

  render() {
    const {
      showTemplates,
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
          <div
            style={{
              position: "fixed",
              right: showTemplates ? "305px" : "5px",
              top: "47px"
            }}
          >
          </div>
          <Npcs admin={true} />
          <div style={{ display: "flex", minHeight: 150, heigh: "150px", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CustomRoller rollHandle={customRoll} />
              <RollList list={rollsLog || []} />
            </div>
            <D20
              value={d20.roll}
              name={d20.name}
              rollHandle={rollD20}
              date={d20.date}
            />
          </div>
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
