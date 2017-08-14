import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'
import { addPlayer } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
  addPlayerClick: (parentId) => {
    dispatch(addPlayer(parentId))
  }
})

const mapStateToProps = (state) => {
  return {
    items: state.players.list,
    roomId: state.rooms.currentId
  }
}

class Players extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }

  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} addField={() => alert('addField')} />
  }

  handleAddPlayer = () => {
    this.props.addPlayerClick(this.props.roomId)
  }

  render() {
    const admin = this.props.admin
    const fields = [{visibleToUsers: true,
                    name: 'hp',
                    value: '10',
                    onChange: () => console.log(1),
                    _id: String(Math.random(0, 100))
                  }];
    const visibleToUsers = true;
    return (
      <div>
        <span>Players:</span>
        <div style={{ display: 'flex' }}>
          <Units renderItem={this.renderUnit}
                items={[{name: 'P-1', fields, visibleToUsers },
                        {name: 'P-2', fields, visibleToUsers }]}
           />
           {admin  &&
             <AddUnit onClick={this.handleAddPlayer} />
           }
         </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps
)(Players)
