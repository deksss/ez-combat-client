import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

const Unit = ({ unit }) => {
  const {name, fields, visibleToUsers, addField, _id, onChangeField} = unit

  const createHandleChangeField = () => {
    const unitId = _id
    return (fieldId) => onChangeField(unitId, fieldId)
  }

  const renderField = (field) => {
    return <Field field={field}
                  key={field._id}
                  onChange={createHandleChangeField()} />
  }

  const handleAddField = () => {
    addField({_id})
  }

  return (
    <div className="Unit"
      style={{backgroundColor: visibleToUsers ? 'white' : 'grey'}}>
      <h3>
        ({name})
      </h3>
      <button onClick={handleAddField}>+f</button>
      <ul>
        {fields.map(renderField)}
      </ul>
    </div>
  )
}

Unit.propTypes = {
  unit: PropTypes.shape({
    name: PropTypes.string,
    fields: PropTypes.array.isRequired,
    visibleToUsers: PropTypes.bool.isRequired
  }).isRequired,
  addField: PropTypes.func.isRequired
}

export default Unit
