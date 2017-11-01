import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import Help from "../icons/Help";
import Settings from "../icons/Settings";
import Home from "../icons/Home";
import styles from "../../styles/IconStyles";
import { Link } from "react-router-dom";
import Ws from "../ws/index";
import HeaderBlockStyled from "../styled/HeaderBlock";
import HeaderStyled from "../styled/HeaderStyled";

export default class RoomHeader extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  };

  handleAddClick = () => {
  };

  handleToggleSettings = () => this.props.toggleSettings();

  render() {
    return (
      <HeaderStyled>
        <HeaderBlockStyled>
          <Link to={`/`}>
            <IconButton onClick={() => console.log(this)}
                        iconStyle={styles.mediumIcon}
                        style={styles.medium}>
              <Home />
            </IconButton>
          </Link>
        <span>{this.props.userId} </span>
        <h4 style={{marginLeft: 20}}>Room: {this.props.roomId}</h4>
        <Ws />
        </HeaderBlockStyled>
        <HeaderBlockStyled>
          <IconButton onClick={this.handleToggleSettings}
                      iconStyle={styles.mediumIcon}
                      style={styles.medium}>
            <Settings />
          </IconButton>
          <IconButton onClick={() => console.log(this)}
                      iconStyle={styles.mediumIcon}
                      disabled={true}
                      style={styles.medium}>
            <Help />
          </IconButton>
        </HeaderBlockStyled>
      </HeaderStyled>
    );
  }
}
