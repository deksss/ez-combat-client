import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import Visibility  from './Icons/Visibility';
import VisibilityOff from './Icons/VisibilityOff';
import styles from '../styles/IconStyles'

const ButtonVisible = (props) => {
  const { _id, runAction, visibleToUsers } = props

  const handleClick = () => {
    runAction(_id);
  }

  return (
    <IconButton onClick={handleClick}
                iconStyle={styles.smallIcon}
                style={styles.small}>
      {visibleToUsers ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  )
}

ButtonVisible.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
  visibleToUsers: PropTypes.bool.isRequired
}

export default ButtonVisible
