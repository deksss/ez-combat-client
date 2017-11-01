import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonVisible from "../../../common/buttons/Visible";
import ButtonDelete from "../../../common/buttons/Delete";
import FieldName from "./FieldName";
import Item from "../Item";
import TextField from "material-ui/TextField";
import { MAIN_COLOR } from "../../../../styles/constants";
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

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveField(dragIndex);
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

      constructor(props) {
        super(props);
        this.state = {
          value: props.field.value,
          isDragable: true
        };
      }

      componentWillReceiveProps(nextProps) {
        this.setInputValue(nextProps.field.value);
      }

      getInputValue = () => {
        return this.state.value;
      };

      setInputValue = val => {
        this.setState({
          value: val
        });
      };

      handleChange = event => {
        this.setInputValue(event.target.value);
      };

      handleKeyUp = e => {
        if (e.keyCode === 13) {
          this.props.onChangeField(this.getInputValue());
        }
      };

      handleBlur = e => {
        this.props.onChangeField(this.getInputValue());
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
          const FieldEditable = (
            <Item style={itemStyle}>
              <FieldName
                name={name}
                onChange={changeName}
                _id={_id}
                dragOff={() => this.setState({ isDragable: false })}
                dragOn={() => this.setState({ isDragable: true })}
              />
              <TextField
                placeholder={placeholder}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                multiLine={true}
                rows={1}
                value={this.state.value}
                textareaStyle={{ color: MAIN_COLOR }}
                id={`input_${_id}`}
                onMouseEnter={() => this.setState({ isDragable: false })}
                onMouseLeave={() => this.setState({ isDragable: true })}
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
          );

          if (this.state.isDragable) {
            return connectDragSource(
              connectDropTarget(<div> {FieldEditable} </div>)
            );
          }
          return <div> {FieldEditable} </div>;
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
