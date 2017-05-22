import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

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
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

export default Unit
