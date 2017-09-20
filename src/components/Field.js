import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonVisible from "./ButtonVisible";
import ButtonDelete from "./ButtonDelete";
import FieldName from "./FieldName";
import Item from "./Item";
import TextField from "material-ui/TextField";
import { MAIN_COLOR } from "../styles/constants";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";

const ItemTypes = {
  FIELD: "field"
};

const fieldSource = {
  beginDrag(props) {
    return {
      id: props.field._id,
      index: props.field.index
    };
  }
};

const fieldTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.field.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveField(dragIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

export default DropTarget(ItemTypes.FIELD, fieldTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.FIELD, fieldSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(
    class Field extends Component {
      static propTypes = {
        field: PropTypes.shape({
          name: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,
          visibleToUsers: PropTypes.bool.isRequired,
          canEdit: PropTypes.bool.isRequired,
          index: PropTypes.number.isRequired
        }).isRequired,
        onChangeField: PropTypes.func.isRequired,
        moveField: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
      };

      handleChange = (e, value) => {
        this.props.onChangeField(value);
      };

      render() {
        const placeholder = "enter value";
        const { _id, name, visibleToUsers, value, canEdit } = this.props.field;
        const deleteField = () => this.props.delete();
        const setVisibility = () => this.props.toggleVisible();
        const changeName = name => this.props.changeName(name);
        const { isDragging, connectDragSource, connectDropTarget } = this.props;
        const itemStyle = {
          backgroundColor: visibleToUsers ? "#FFFFFF" : "#C0C0C0",
          opacity: isDragging ? 0 : 1
        };

        if (canEdit) {
          return connectDragSource(
            connectDropTarget(
              <div>
                <Item style={itemStyle}>
                  <FieldName name={name} onChange={changeName} _id={_id} />
                  <TextField
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    multiLine={true}
                    rows={1}
                    value={value}
                    textareaStyle={{ color: MAIN_COLOR }}
                    id={`input_${_id}`}
                  />

                  <ButtonVisible
                    _id={_id}
                    runAction={setVisibility}
                    visibleToUsers={visibleToUsers}
                    color={MAIN_COLOR}
                  />
                  <ButtonDelete
                    _id={_id}
                    runAction={deleteField}
                    color={MAIN_COLOR}
                  />
                </Item>
              </div>
            )
          );
        } else {
          return (
            <Item style={{ color: MAIN_COLOR, marginTop: "10px" }}>
              <div>
                <span style={{ fontSize: 15, marginRight: 15 }}>{name}:</span>
                <span style={{ fontSize: 15, fontFamily: "Heebo" }}>
                  {value}
                </span>
              </div>
            </Item>
          );
        }
      }
    }
  )
);
