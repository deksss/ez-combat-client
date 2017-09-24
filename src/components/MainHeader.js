import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import Help from "./Icons/Help";
import styles from "../styles/IconStyles";
import Ws from "../containers/Ws";
import HeaderStyledBlock from "./HeaderStyledBlock";
import HeaderStyled from "./HeaderStyled";

export default class MainHeader extends Component {
  render() {
    return (
      <HeaderStyled>
        <HeaderStyledBlock>
        <h3 style={{marginLeft:20}}>EZCombat </h3>
        <Ws />
        </HeaderStyledBlock>
        <HeaderStyledBlock>
          <IconButton onClick={() => console.log(this)}
                      iconStyle={styles.mediumIcon}
                      disabled={true}
                      style={styles.medium}>
            <Help />
          </IconButton>
        </HeaderStyledBlock>
      </HeaderStyled>
    );
  }
}
