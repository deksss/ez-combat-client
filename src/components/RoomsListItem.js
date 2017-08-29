import React from 'react'
import PropTypes from 'prop-types'

const RoomsListItem = ({ room }) => {
  const {
    name,
    _id,
    owner_code,
    joinHandler,
    modJoinHandler
  } = room

//need move to top level component
  const handleClick = () => {
    if (owner_code) {
      modJoinHandler({_id, owner_code, name})
    } else {
      joinHandler({_id})
    }
  }



  return (
    <li
      style={{minWidth: '200px' }}
    >
        <h4>Name: {name}</h4> join ID: {_id}, mod code: {owner_code}
        <button onClick={handleClick}>Enter</button>
    </ li>
  )

}

RoomsListItem.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string.isRequired,
    joinHandler: PropTypes.func.isRequired,
    modJoinHandler: PropTypes.func.isRequired,
  }).isRequired,
}

export default RoomsListItem
