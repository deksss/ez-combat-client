import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import ButtonVisible from './ButtonVisible'
import ButtonDelete from './ButtonDelete'
import ButtonCopy from './ButtonCopy'


const Unit = ({ unit }) => {
  const {
    name,
    fields,
    visibleToUsers,
    _id,
    onChangeField,
    unitActions
  } = unit

  const createHandleChangeField = (fieldId) => {
    return (value) => onChangeField(fieldId, value)
  }

  const renderField = (field) => {
    return <Field field={field}
                  key={field._id}
                  onChangeField={createHandleChangeField(field._id)} />
  }

  const handleAddField = () => {
    unitActions.addField({_id})
  }

  return (
    <div className="Unit"
      style={{backgroundColor: visibleToUsers ? 'white' : 'grey'}}>
      <h3>
        ({name})
        <ButtonCopy _id={_id}
                    runAction={unitActions.copy}/>
        <ButtonVisible _id={_id}
                       runAction={unitActions.toggleVisibility}
                       visibleToUsers={visibleToUsers}/>
        <ButtonDelete _id={_id}
                      runAction={unitActions.delete} />
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
    visibleToUsers: PropTypes.bool.isRequired,
    unitActions: PropTypes.object.isRequired,
  }).isRequired,
}

export default Unit
