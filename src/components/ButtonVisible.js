import React from 'react'
import PropTypes from 'prop-types'

const ButtonVisible = (props) => {
  const { _id, runAction, visibleToUsers } = props

  const handleClick = () => {
    runAction(_id);
  }

  const visibleIndicator = visibleToUsers ? 'o' : '-'
  return (
    <button onClick={handleClick}>
    {visibleIndicator}
    </button>
  )
}

ButtonVisible.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
  visibleToUsers: PropTypes.bool.isRequired
}

export default ButtonVisible
