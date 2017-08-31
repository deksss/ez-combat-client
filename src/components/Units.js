import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { Scrollbars } from 'react-custom-scrollbars';

const style = {
  minWidth: '95%',
  minHeight: '250px',
  margin: '5px',
  padding: '5px'
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

    return (

        <Paper zDepth={1} style={style}>
        <Scrollbars style={{ width: '100%', height: 240 }}>
          <div style={{ display: "flex" }}>{items.map(renderItem)}</div>
        </Scrollbars>
        </Paper>

    );
  }
}
