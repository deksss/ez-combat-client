import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import { MAIN_BG_COLOR } from "../styles/constants";

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
    <ListItem>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div>
          Room ID: <i>{_id}</i>
        </div>
        <div>
          {(owner_code && (
            <RaisedButton
              style={{ margin: "0.5em" }}
              onClick={handleClick}
              label="Enter"
              labelColor={"white"}
              backgroundColor={MAIN_BG_COLOR}
            />
          )) || (
            <RaisedButton
              style={{ margin: "0.5em" }}
              onClick={handleClickUser}
              label="Enter"
              labelColor={"white"}
              backgroundColor={MAIN_BG_COLOR}
            />
          )}
        </div>
      </div>
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
