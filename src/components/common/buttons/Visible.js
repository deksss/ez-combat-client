import React from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import Visibility from "../../icons/Visibility";
import VisibilityOff from "../../icons/VisibilityOff";
import styles from "../../../styles/IconStyles";

const ButtonVisible = props => {
  const { _id, runAction, visibleToUsers, color } = props;

  const handleClick = () => {
    runAction(_id);
  };

  return (
    <IconButton
      onClick={handleClick}
      iconStyle={Object.assign({}, styles.smallIcon, { color: color })}
      style={styles.small}
    >
      {visibleToUsers ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
};

ButtonVisible.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
  visibleToUsers: PropTypes.bool.isRequired
};

export default ButtonVisible;
