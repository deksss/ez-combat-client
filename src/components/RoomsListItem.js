import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

const RoomsListItem = ({ room }) => {
  const { name, _id, owner_code, joinHandler, modJoinHandler } = room;

  //need move to top level component
  const handleClick = () => {
    modJoinHandler({ _id, owner_code, name });
  };

  const handleClickUser = () => {
    joinHandler({ _id });
  };

  return (
    <ListItem style={{display: 'flex'}}>
      <h4>Room ID: <i>{_id}</i></h4>
      {owner_code && <RaisedButton
        style={{ margin: "0.5em" }}
        onClick={handleClick}
        label="Enter GM"
        primary={true}
      />}
      <RaisedButton
        style={{ margin: "0.5em" }}
        onClick={handleClickUser}
        label="Enter"
        primary={false}
      />
    </ListItem>
  );
};

RoomsListItem.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string.isRequired,
    joinHandler: PropTypes.func.isRequired,
    modJoinHandler: PropTypes.func.isRequired
  }).isRequired
};

export default RoomsListItem;
