import React from "react";
import PropTypes from "prop-types";
import Field from "./field/index";
import ButtonVisible from "../../common/buttons/Visible";
import ButtonDelete from "../../common/buttons/Delete";
import ButtonCopy from "../../common/buttons/Copy";
import UnitName from "./UnitName";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { MAIN_BG_COLOR } from "../../../styles/constants";
import UnitPermission from "./UnitPermission";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Unit = ({ unit }) => {
  const {
    name,
    permission,
    fields,
    visibleToUsers,
    _id,
    unitActions,
    fieldActions,
    canEdit,
    style,
    styleHidden,
    canCRUD
  } = unit;

  const createHandleChangeField = fieldId => {
    return value => fieldActions.onChangeField(fieldId, value);
  };

  const createHandleChangeName = fieldId => {
    return name => fieldActions.changeName(fieldId, name);
  };

  const createHandleToggleVisible = fieldId => {
    return () => fieldActions.toggleVisible(fieldId);
  };

  const createHandleDelete = fieldId => {
    return () => fieldActions.delete(fieldId);
  };

  const createHandleMove = fieldId => {
    return index => fieldActions.moveField(fieldId, index);
  };

  const renderField = field => {
    return (
      <Field
        field={field}
        key={field._id}
        onChangeField={createHandleChangeField(field._id)}
        toggleVisible={createHandleToggleVisible(field._id)}
        changeName={createHandleChangeName(field._id)}
        delete={createHandleDelete(field._id)}
        moveField={createHandleMove(field._id)}
      />
    );
  };

  const handleAddField = () => {
    unitActions.addField({ _id });
  };

  const unitHeaderStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    height: "55px",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: "100%",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    fontSize: "20px"
  };

  const unitHeaderStyleShowed = Object.assign({}, unitHeaderStyle, {
    color: style.color,
    backgroundColor: style.backgroundColor
  });
  const unitHeaderStyleHiden = Object.assign({}, unitHeaderStyle, {
    color: styleHidden.color,
    backgroundColor: styleHidden.backgroundColor
  });

  const buttonColor = visibleToUsers ? style.color : styleHidden.color;
  const itemsSorted = fields.slice().sort((a, b) => b.index < a.index);

  if (canEdit) {
    return (
      <Paper
        zDepth={1}
        style={{
          marginRight: "20px",
          backgroundColor: visibleToUsers ? "#FFFFFF" : "#E0E0E0",
          width: 340,
          minHeight: 200,
          alignItems: "center",
          overflowY: "auto",
          flex: "1 0 auto",
          position: 'relative'
        }}
      >
        <div
          style={visibleToUsers ? unitHeaderStyleShowed : unitHeaderStyleHiden}
        >
          <UnitName
            name={name}
            onChange={unitActions.changeName}
            _id={_id}
            readOnly={!canCRUD}
          />
          {canCRUD && (
            <div>
              <ButtonCopy
                _id={_id}
                runAction={unitActions.copy}
                color={buttonColor}
              />
              <ButtonVisible
                _id={_id}
                runAction={unitActions.toggleVisibility}
                visibleToUsers={visibleToUsers}
                color={buttonColor}
              />
              {unitActions.changePermission && (
                <UnitPermission
                  permission={permission}
                  onChange={unitActions.changePermission}
                  _id={_id}
                />
              )}
              <ButtonDelete
                _id={_id}
                runAction={unitActions.delete}
                color={buttonColor}
              />
            </div>
          )}
        </div>
        <ul>{itemsSorted.map(renderField)}</ul>
        <div style={{ position: "sticky", bottom: 5, left: 0 }}>
          <FloatingActionButton
            mini={true}
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
              marginTop: 10
            }}
            iconStyle={{ width: 30, height: 30 }}
            backgroundColor={MAIN_BG_COLOR}
            onClick={handleAddField}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </Paper>
    );
  } else {
    return (
      <Paper
        zDepth={1}
        style={{
          marginRight: "20px",
          backgroundColor: "#FFFFFF",
          width: 340,
          minHeight: 200,
          alignItems: "center"
        }}
      >
        <div style={unitHeaderStyleShowed}>
          <UnitName name={name} readOnly={true} onChange={() => {}} _id={_id} />
        </div>
        <ul>{itemsSorted.map(renderField)}</ul>
      </Paper>
    );
  }
};

Unit.propTypes = {
  unit: PropTypes.shape({
    name: PropTypes.string,
    fields: PropTypes.array.isRequired,
    visibleToUsers: PropTypes.bool.isRequired,
    unitActions: PropTypes.object.isRequired,
    fieldActions: PropTypes.object.isRequired
  }).isRequired
};

export default DragDropContext(HTML5Backend)(Unit);
