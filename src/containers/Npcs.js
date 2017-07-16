import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'

class Npcs extends Component {
  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} />
  }

  render() {
    return (
      <div>
        <span>NPCS:</span>
        <Units renderItem={this.renderUnit}
              items={[{name: 'Goblin'}, {name: 'Orc'}]}
         />
        <AddUnit onClick={() => alert("addNPC")} />
      </div>
    )
  }
}


export default Npcs
