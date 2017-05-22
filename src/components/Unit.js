import React from 'react'
import PropTypes from 'prop-types'

const Unit = ({ unit }) => {
  const {name } = unit

  return (
    <div className="Unit">
      <h3>
        ({name})
      </h3>
    </div>
  )
}

Unit.propTypes = {
  unit: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

export default Unit
