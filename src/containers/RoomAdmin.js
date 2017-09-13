import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import TemplatesList from "../components/TemplatesList";
import { connect } from "react-redux";
import {
  templatesToggle,
  settingsToggle,
  saveStoreToFile,
  loadStoreFromJson
} from "../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import List from "../components/Icons/List";
import GeneralSettings from "./GeneralSettings";
import D20 from "../components/dices/D20";

const mapStateToProps = state => {
  return {
    showTemplates: state.templates.showTemplates,
    roomId: state.rooms.currentId,
    showGeneralSettings: state.sidebar.showGeneralSettings
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
  loadFromFile: (data) => {
    dispatch(loadStoreFromJson(data));
  }
});

class RoomAdmin extends Component {
  static propTypes = {
    showTemplates: PropTypes.bool.isRequired,
    roomId: PropTypes.string.isRequired
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
      loadFromFile
    } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader
            roomId={this.props.roomId}
            toggleSettings={toggleSettings}
          />
          <div
            style={{
              position: "fixed",
              right: showTemplates ? "305px" : "5px",
              top: "47px"
            }}
          >
            <FloatingActionButton
              backgroundColor="#8BC34A"
              onClick={this.handleTemplatesToggle}
            >
              <List />
            </FloatingActionButton>
          </div>
          <TemplatesList showTemplates={showTemplates} />
          <Npcs admin={true} />
          <br />
          <D20 value={"2"}/>
          <br />
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
