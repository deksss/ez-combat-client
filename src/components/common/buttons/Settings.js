import React from 'react'
import PropTypes from 'prop-types'

const ButtonSettings = ( props ) => {
  const {_id, runAction } = props

  const handleClick = () => {
    runAction(_id);
  }

  return (
    <button onClick={handleClick}>
    S
    </button>
  )
}

ButtonSettings.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
}

export default ButtonSettings
