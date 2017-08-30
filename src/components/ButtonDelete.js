import React from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import DeleteForever from "./Icons/DeleteForever";
import styles from "../styles/IconStyles";

const ButtonDelete = props => {
  const { _id, runAction } = props;

  const handleClick = () => {
    runAction(_id);
  };

  return (
    <IconButton
      onClick={handleClick}
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <DeleteForever />
    </IconButton>
  );
};

ButtonDelete.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired
};

export default ButtonDelete;
