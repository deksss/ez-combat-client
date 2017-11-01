import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import Help from "../icons/Help";
import styles from "../../styles/IconStyles";
import Ws from "../ws/index";
import HeaderBlockStyled from "../styled/HeaderBlock";
import HeaderStyled from "../styled/HeaderStyled";

export default class MainHeader extends Component {
  render() {
    return (
      <HeaderStyled>
        <HeaderBlockStyled>
          <h3 style={{ marginLeft: 20 }}>EZCombat </h3>
          <Ws />
        </HeaderBlockStyled>
        <HeaderBlockStyled>
          <IconButton
            onClick={() => console.log(this)}
            iconStyle={styles.mediumIcon}
            disabled={true}
            style={styles.medium}
          >
            <Help />
          </IconButton>
        </HeaderBlockStyled>
      </HeaderStyled>
    );
  }
}
