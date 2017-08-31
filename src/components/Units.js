import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { Scrollbars } from 'react-custom-scrollbars';

const style = {
  minWidth: '300px',
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

  static defaultProps = {
    items: [{ name: "one" }, { name: "two" }]
  };

  render() {
    const { items, renderItem } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty) {
      return (
        <Paper zDepth={2} style={style}>
          <h4>
            <i>Nothing here!</i>
          </h4>
        </Paper>
      );
    }
    //hack: need replace
    const width = Math.min(items.length * 250, window.innerWidth - 200)

    return (
        <Paper zDepth={1} style={style}>
        <Scrollbars style={{ minWidth: '300px', width: width, height: 250 }}>
          <div style={{ display: "flex" }}>{items.map(renderItem)}</div>
        </Scrollbars>
        </Paper>

    );
  }
}
