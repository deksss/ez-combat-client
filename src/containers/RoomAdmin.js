import React, { Component } from "react";
import PropTypes from "prop-types";
import Players from "./Players";
import Npcs from "./Npcs";
import TemplatesList from "../components/TemplatesList";
import { connect } from "react-redux";
import { templatesToggle } from "../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RoomHeader from "../components/RoomHeader";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import List from "../components/Icons/List";

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
          <RoomHeader roomId={this.props.roomId} />
          <div style={{ position: "fixed",
                        right: showTemplates ? "305px" : '5px',
                        top: '47px'}}>
            <FloatingActionButton backgroundColor='#8BC34A'
                                  onClick={this.handleTemplatesToggle}>

              <List />
            </FloatingActionButton>
          </div>
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
