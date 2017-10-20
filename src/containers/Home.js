import React, { Component } from "react";
import Helmet from "react-helmet";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import Join from "./Join";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh"
};

export default class Home extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={style}>
          <Helmet title="EZCombat - RPG BOARD GAME SANDBOX TOOLS" />
          <MainHeader />
          <Join />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}