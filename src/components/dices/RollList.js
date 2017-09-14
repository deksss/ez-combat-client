import React from "react";
import PropTypes from "prop-types";
import {List, ListItem} from 'material-ui/List';
import { Scrollbars } from "react-custom-scrollbars";
import uuid from "../../common/uuid";

class RollList extends React.Component {

  renderD20roll(data) {
    const text = `(${data.date}) ${data.name}:
    ${data.roll}`;
    return <ListItem primaryText={text} style={{width: 300}} key={uuid()} />;
  }

  render() {
    const { list } = this.props;
    if (list.length) {
      return (
        <Scrollbars style={{width: 350, height: 150}}>
          <List>
            {list.reverse().map(this.renderD20roll)}
          </List>
        </Scrollbars>
      );
    } else {
      return (
        <div style={{width: 350, height: 150}}>
        </div>
      );
    }
  }
};

RollList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default RollList;
