import React from "react";
import PropTypes from "prop-types";
import Field from "./Field";
import ButtonVisible from "./ButtonVisible";
import ButtonDelete from "./ButtonDelete";
import ButtonCopy from "./ButtonCopy";
import UnitName from "./UnitName";
import UnitCard from "./UnitCard";
import Paper from "material-ui/Paper";

const Unit = ({ unit }) => {
  const {
    name,
    fields,
    visibleToUsers,
    _id,
    unitActions,
    fieldActions,
    canEdit
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

  const renderField = field => {
    return (
      <Field
        field={field}
        key={field._id}
        onChangeField={createHandleChangeField(field._id)}
        toggleVisible={createHandleToggleVisible(field._id)}
        changeName={createHandleChangeName(field._id)}
        delete={createHandleDelete(field._id)}
      />
    );
  };

  const handleAddField = () => {
    unitActions.addField({ _id });
  };

  const unitHeaderStyle = {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: "flex",
    height: "55px",
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: '100%',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    fontSize: '20px'
  };
  const unitHeaderStyleShowed = Object.assign({},
    unitHeaderStyle,
    {
      backgroundColor: '#96C85B',
      color: '#795548',
    }
  );
  const unitHeaderStyleHiden = Object.assign({},
    unitHeaderStyle,
    {
      backgroundColor: '#7B5F47',
      color: '#FFFFFF',
    }
  );

  if (canEdit) {
    return (
      <Paper zDepth={1} style={{marginRight: '20px'}}>
      <UnitCard>
        <div style={visibleToUsers ? unitHeaderStyleShowed : unitHeaderStyleHiden}>
          <UnitName name={name} onChange={unitActions.changeName} _id={_id} />
          <div>
            <ButtonCopy _id={_id} runAction={unitActions.copy} />
            <ButtonVisible
              _id={_id}
              runAction={unitActions.toggleVisibility}
              visibleToUsers={visibleToUsers}
            />
            <ButtonDelete _id={_id} runAction={unitActions.delete} />
          </div>
        </div>

        <button onClick={handleAddField}>+f</button>

        <ul>{fields.map(renderField)}</ul>
      </UnitCard>
      </Paper>
    );
  } else {
    return (
      <UnitCard style={{ minWidth: "250px" }}>
        <h3>{name}</h3>
        <ul>{fields.map(renderField)}</ul>
      </UnitCard>
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

export default Unit;
