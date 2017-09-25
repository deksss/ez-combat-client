import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

const style = {
  //minWidth: '300px',
  height: "calc(50vh - 155px)",
  minHeight: 200,
  margin: "5px",
  padding: "5px",
  width: "100vw"
};

export default class Units extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  };

  render() {
    const { items, renderItem, emptyMsg } = this.props;
    const itemsSorted = items.slice().sort((a, b) => b.index < a.index);
    const isEmpty = itemsSorted.length === 0;
    style.height  = this.props.height || style.height

    if (isEmpty) {
      return (
        <div style={style}>
          <h4>{emptyMsg}</h4>
        </div>
      );
    }
    return (
      <Scrollbars style={style} autoHide>
        <div style={{ display: "flex" }}>{itemsSorted.map(renderItem)}</div>
      </Scrollbars>
    );
  }
}
