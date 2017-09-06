import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from 'react-custom-scrollbars';

const style = {
  //minWidth: '300px',
  minHeight: '250px',
  margin: '5px',
  padding: '5px',
  maxWidth: '90vw'
}

export default class Units extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  };

  render() {
    const { items, renderItem } = this.props;

    const isEmpty = items.length === 0;
    //hack: need replace
    const width = Math.min(items.length * 410, window.innerWidth - 100)
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
        <div style={style}>
        <Scrollbars style={{ minWidth: '300px', width: width, height: 250 }}>
          <div style={{ display: "flex" }}>{items.map(renderItem)}</div>
        </Scrollbars>
        </div>

    );
  }
}
