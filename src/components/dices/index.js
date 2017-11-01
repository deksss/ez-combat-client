import React from "react";
import D20 from "./d20/index";
import RollList from "./Log/index";
import CustomRoller from "./RollString/index";
import PropTypes from "prop-types";

const style = {
  main: {
    display: "flex",
    minHeight: 150,
    heigh: "150px",
    width: "100%"
  },
  sideContainer: {
    display: "flex",
    flexDirection: "column"
  }
};

const DiceMain = props => (
  <div style={style.main}>
    <div style={style.sideContainer}>
      <CustomRoller rollHandle={props.customRoll} />
      <RollList list={props.rollsLog} />
    </div>
    <D20
      value={props.d20.roll}
      name={props.d20.name}
      date={props.d20.date}
      rollHandle={props.rollD20}
    />
  </div>
);

DiceMain.propTypes = {
  d20: PropTypes.object.isRequired,
  rollD20: PropTypes.func.isRequired,
  customRoll: PropTypes.func.isRequired,
  rollsLog: PropTypes.array.isRequired
}

export default DiceMain;
