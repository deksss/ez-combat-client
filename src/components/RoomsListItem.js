import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui/List";
import { MAIN_BG_COLOR, MAIN_COLOR } from "../styles/constants";
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import Delete from "material-ui/svg-icons/action/delete";
import IconButton from "material-ui/IconButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import SaveButton from "material-ui/svg-icons/content/save";

class RoomsListItem extends Component {
  static propTypes = {
    room: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string.isRequired,
      joinHandler: PropTypes.func.isRequired,
      modJoinHandler: PropTypes.func.isRequired,
      deleteHandler: PropTypes.func.isRequired,
      saveHandler: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  //need move to top level component
  handleClick = () => {
    const { _id, owner_code, name, modJoinHandler } = this.props.room;
    modJoinHandler({ _id, owner_code, name });
  };

  handleClickUser = () => {
    const { _id, joinHandler } = this.props.room;
    joinHandler({ _id });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    const { _id, deleteHandler } = this.props.room;
    this.setState({ open: false });
    deleteHandler({ _id });
  };

  handleSave = () => {
    const { _id, saveHandler } = this.props.room;
    saveHandler({ roomId: _id });
  };

  render() {
    const { _id, owner_code, saveHandler } = this.props.room;
    const modalActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Delete" primary={true} onClick={this.handleDelete} />
    ];

    return (
      <ListItem>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            color: MAIN_COLOR
          }}
        >
          <h3>{_id}</h3>
          <div>
            <IconButton
              tooltip="Enter to room"
              onClick={(owner_code && this.handleClick) || this.handleClickUser}
            >
              <ExitToApp color={MAIN_COLOR} backgroundColor={MAIN_BG_COLOR} />
            </IconButton>
            <IconButton tooltip="Save Room" onClick={this.handleSave}>
              <SaveButton color={MAIN_COLOR} backgroundColor={MAIN_BG_COLOR} />
            </IconButton>
            {owner_code && (
              <IconButton tooltip="Delete Room" onClick={this.handleOpen}>
                <Delete color={MAIN_COLOR} backgroundColor={MAIN_BG_COLOR} />
              </IconButton>
            )}
          </div>
          <Dialog
            actions={modalActions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Delete room?
          </Dialog>
        </div>
      </ListItem>
    );
  }
}

export default RoomsListItem;
