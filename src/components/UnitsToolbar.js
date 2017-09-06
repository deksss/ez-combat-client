import React, { Component } from "react";
import PropTypes from "prop-types";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
//import VisibilityOff from 'material-ui/svg-icons/action/visibility_off';
import Visibility from 'material-ui/svg-icons/action/visibility';
import Delete from 'material-ui/svg-icons/action/delete';
import SortAz from 'material-ui/svg-icons/content/sort';
import { MAIN_BG_COLOR, MAIN_COLOR } from '../styles/constants';

const style = {
  padding: 10,
  paddingLeft: 0,
  display: 'flex',
  flexDirection: 'column',
  color: MAIN_COLOR
}

const itemStyle = {
  marginBottom: 10,
  color: MAIN_COLOR
}

export default class UnitsToolbar extends Component {
  static propTypes = {
    addClick: PropTypes.func.isRequired,
  //  hideAllClick: PropTypes.func.isRequired,
  //  deleteAllClick: PropTypes.func.isRequired,
  };

  render() {
    //const { addClick, hideAllClick, deleteAllClick } = this.props;
    const { addClick } = this.props;
console.log(MAIN_COLOR)
    return (
        <div style={style}>
          <FloatingActionButton mini={true}
                                style={itemStyle}
                                backgroundColor={MAIN_BG_COLOR}
                                onClick={addClick}>

            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton mini={true}
                                iconStyle={{color:MAIN_COLOR}}
                                style={itemStyle}
                                backgroundColor={MAIN_BG_COLOR}
                                onClick={addClick}>

            <Visibility color={MAIN_COLOR} />
          </FloatingActionButton>
          <FloatingActionButton mini={true}
                                style={itemStyle}
                                backgroundColor={MAIN_BG_COLOR}
                                onClick={addClick}>

            <Delete />
          </FloatingActionButton>
          <FloatingActionButton mini={true}
                                style={itemStyle}
                                backgroundColor={MAIN_BG_COLOR}
                                iconStyle={{color: MAIN_COLOR}}
                                onClick={addClick}>

            <SortAz />
          </FloatingActionButton>
        </div>

    );
  }
}
