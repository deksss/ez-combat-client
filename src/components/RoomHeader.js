import styled from 'styled-components';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const HeaderStyled = styled.div`
  display: flex;
  height: 48px;
  width: 100%;
  background-color: #8BC34A;
  color: #FFFFFF;
  font-size: 20px;
  align-items: center;
  font-family: "Hammersmith One";
;
`

export default class RoomHeader extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired
  }

  handleAddClick = () => {
    console.log(this.props)
  }

  render() {
    return (
      <HeaderStyled>
        <span>{this.props.roomId}</span>
      </HeaderStyled>
    )
  }
}
