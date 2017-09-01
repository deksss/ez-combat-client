import styled from "styled-components";
import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import Help from "./Icons/Help";
import Settings from "./Icons/Settings";
import Home from "./Icons/Home";
import styles from "../styles/IconStyles";

const HeaderStyled = styled.div`
  display: flex;
  height: 48px;
  width: 100%;
  background-color: #8bc34a;
  color: #ffffff;
  font-size: 20px;
  align-items: center;
  font-family: "Hammersmith One";
`;

export default class RoomHeader extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired
  };

  handleAddClick = () => {
    console.log(this.props);
  };

  render() {
    return (
      <HeaderStyled>
        <IconButton onClick={() => console.log(this)}
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
          <Home />
        </IconButton>
        <span>{this.props.roomId}</span>
        <IconButton onClick={() => console.log(this)}
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
          <Settings />
        </IconButton>
        <IconButton onClick={() => console.log(this)}
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
          <Help />
        </IconButton>
      </HeaderStyled>
    );
  }
}
