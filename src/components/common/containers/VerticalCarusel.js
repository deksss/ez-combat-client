import React, { Component } from "react";
import PropTypes from "prop-types";

const style = {
  minHeight: 220,
  margin: "5px",
  padding: "5px",
  minWidth: 350,
  maxWidth: "100vw",
  overflow: "auto",
  display: "flex"
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
    const calculatedStyle = Object.assign({}, style, {
      height: this.props.height || style.height
    });

    if (isEmpty) {
      return (
        <div style={calculatedStyle}>
          <h4>{emptyMsg}</h4>
        </div>
      );
    }
    return <div style={calculatedStyle}>{itemsSorted.map(renderItem)}</div>;
  }
}
