import React from 'react'
import PropTypes from 'prop-types'

const ButtonDelete = ( props ) => {
  const {_id, runAction } = props

  const handleClick = () => {
    runAction(_id);
  }

  return (
    <button onClick={handleClick}>
    X
    </button>
  )
}

ButtonDelete.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
}

export default ButtonDelete
