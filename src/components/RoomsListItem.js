import React from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'material-ui/List';


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
    <ListItem>
        <h4>Name: {name}</h4> join ID: {_id}, mod code: {owner_code}
        <button onClick={handleClick}>Enter</button>
    </ ListItem>
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
