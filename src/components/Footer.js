import React from "react";
import { MAIN_COLOR } from "../styles/constants";

const style = {
  flex:1,
  display: 'flex',
  justifyContent: "flex-end",
  flexDirection: "column",
  padding:5,
  color: MAIN_COLOR
};

const Footer = props => (
  <div style={style}>
    <div>Markovets-Sobolevskiy - 2017</div>
  </div>
);

export default Footer;
