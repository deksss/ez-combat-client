import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

const Unit = ({ unit }) => {
  const {name, fields, visibleToUsers} = unit
  const renderField = (field) => {
    return <Field field={field} key={field._id} />
  }
  console.log(fields)
  return (
    <div className="Unit"
      style={{backgroundColor: visibleToUsers ? 'white' : 'grey'}}>
      <h3>
        ({name})
      </h3>
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
  }).isRequired
}

export default Unit
