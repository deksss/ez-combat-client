import styled from "styled-components";
import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import Help from "./Icons/Help";
import Settings from "./Icons/Settings";
import Home from "./Icons/Home";
import styles from "../styles/IconStyles";
import { Link } from "react-router";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 37px;
  width: 100%;
  background-color: #8bc34a;
  color: #ffffff;
  font-size: 20px;
  font-family: "Hammersmith One";
`;

const HeaderStyledBlock = styled.div`
  display: flex;
  align-items: center;
`;

export default class RoomHeader extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  };

  handleAddClick = () => {
    console.log(this.props);
  };

  handleToggleSettings = () => this.props.toggleSettings();

  render() {
    return (
      <HeaderStyled>
        <HeaderStyledBlock>
          <Link to={`/`}>
            <IconButton onClick={() => console.log(this)}
                        iconStyle={styles.mediumIcon}
                        style={styles.medium}>
              <Home />
            </IconButton>
          </Link>

          <span>{this.props.roomId}</span>
        </HeaderStyledBlock>
        <HeaderStyledBlock>
          <IconButton onClick={this.handleToggleSettings}
                      iconStyle={styles.mediumIcon}
                      style={styles.medium}>
            <Settings />
          </IconButton>
          <IconButton onClick={() => console.log(this)}
                      iconStyle={styles.mediumIcon}
                      style={styles.medium}>
            <Help />
          </IconButton>
        </HeaderStyledBlock>
      </HeaderStyled>
    );
  }
}
