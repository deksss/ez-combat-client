import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import TemplatesList from "../components/TemplatesList";
import { connect } from "react-redux";
import { templatesToggle } from "../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";

const mapStateToProps = state => {
  return {
    showTemplates: state.templates.showTemplates,
    roomId: state.rooms.currentId
  };
};

const mapDispatchToProps = dispatch => ({
  templatesToggleClick: () => {
    dispatch(templatesToggle());
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
    const { showTemplates } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <RoomHeader roomId={this.props.roomId}
                      />
          <div style={{ display: "flex", margin: "0.5em" }}>

            <span> _Room: {this.props.roomId}</span>
          </div>
          <button
            style={{ position: "absolute", right: showTemplates ? "300px" : 0 }}
            onClick={this.handleTemplatesToggle}
          >
            {showTemplates ? "Hide Templates" : "Show Templates"}
          </button>
          <TemplatesList showTemplates={showTemplates} />
          <Npcs admin={true} />
          <hr />
          <Players admin={true} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomAdmin);
