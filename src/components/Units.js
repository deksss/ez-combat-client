import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

const style = {
  //minWidth: '300px',
  height: "300px",
  margin: "5px",
  padding: "5px",
  width: "calc(100vw - 150px)"
};

export default class Units extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  };

  render() {
    const { items, renderItem } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty) {
      return (
        <div style={style}>
          <h4>
            <i>Empty!</i>
          </h4>
        </div>
      );
    }
    return (
      <Scrollbars style={style}>
        <div style={{ display: "flex" }}>{items.map(renderItem)}</div>
      </Scrollbars>
    );
  }
}
