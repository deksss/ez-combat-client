import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ContentCopy  from '../Icons/ContentCopy'
import styles from '../styles/IconStyles'


const ButtonCopy = ( props ) => {
  const {_id, runAction } = props

  const handleClick = () => {
    runAction(_id);
  }

  return (
    <IconButton onClick={handleClick}
                iconStyle={styles.smallIcon}
                style={styles.small}>
      <ContentCopy />
    </IconButton>
  )
}

ButtonCopy.propTypes = {
  _id: PropTypes.string.isRequired,
  runAction: PropTypes.func.isRequired,
}

export default ButtonCopy
