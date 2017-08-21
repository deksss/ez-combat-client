import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'
import ButtonVisible from './ButtonVisible'
import ButtonDelete from './ButtonDelete'
import ButtonCopy from './ButtonCopy'
import UnitName from './UnitName'


const Unit = ({ unit }) => {
  const {
    name,
    fields,
    visibleToUsers,
    _id,
    unitActions,
    fieldActions
  } = unit

  const createHandleChangeField = (fieldId) => {
    return (value) => fieldActions.onChangeField(fieldId, value)
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
      style={{backgroundColor: visibleToUsers ? 'white' : 'grey',
              minWidth: '200px'
    }}>
      <div style={{display: 'flex', height: '50px' }}>
        <UnitName name={name}
                  onChange={unitActions.changeName}
                  _id={_id}/>
        <ButtonCopy _id={_id}
                    runAction={unitActions.copy}/>
        <ButtonVisible _id={_id}
                       runAction={unitActions.toggleVisibility}
                       visibleToUsers={visibleToUsers}/>
        <ButtonDelete _id={_id}
                      runAction={unitActions.delete} />
      </div>
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
    fieldActions: PropTypes.object.isRequired,
  }).isRequired,
}

export default Unit
