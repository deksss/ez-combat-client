import React from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "material-ui/List";
import { Scrollbars } from "react-custom-scrollbars";

const rollToString = data => {
  if (data) {
    var str = "";
    var total = 0;
    for (var i = 0; i < data.rolls.length; i++) {
      total += data.rolls[i];
      if (data.rolls.length > 0) {
        var special = "";
        if (i) str += (data.rolls[i] >= 0 ? " + " : " - ");
        if (data.types[i]) {
          str = str + "(d" + data.types[i] + ")";
        //  if (data.types[i] === data.rolls[i]) special = "";
        //  if (data.rolls[i] === 1) special = "";
        }
        str = str  + special  + Math.abs(data.rolls[i]);
      }
    }
    str = str + " = " + total;
    return str;
  } else {
    return "Error in roll formula";
  }
};

class RollList extends React.Component {
  renderRoll(data, index) {
    console.log(index)
    if (data.type && data.type === "d20") {
      const text = `(${data.name}): \u00A0 roll: \u00A0 ${data.roll}`;
      return (
        <ListItem primaryText={text} style={{ width: 300 }} key={index} />
      );
    } else if (data.type && data.type === "custom") {
      const text = `(${data.name}): \u00A0 ${rollToString(data)}`;
      return (
        <ListItem primaryText={text} style={{ width: 300 }} key={index} />
      );
    } else {
      return <div>Incorect roll</div>
    }
  }

  render() {
    const { list } = this.props;
    const listReversed = list.slice().reverse();
    if (list.length) {
      return (
        <Scrollbars style={{ width: 350, height: 150 }}>
          <List>{listReversed.map(this.renderRoll)}</List>
        </Scrollbars>
      );
    } else {
      return <div style={{ width: 350, height: 150 }} />;
    }
  }
}

RollList.propTypes = {
  list: PropTypes.array.isRequired
};

export default RollList;
