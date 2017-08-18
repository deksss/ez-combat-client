import React from 'react'
import PropTypes from 'prop-types'

const ButtonCopy = ( props ) => {
  const {_id, runAction } = props

  const handleClick = () => {
    runAction(_id);
  }

  return (
    <button onClick={handleClick}>
    C
    </button>
  )
}

ButtonCopy.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
}

export default ButtonCopy
