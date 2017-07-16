import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'

class Players extends Component {
  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} />
  }

  render() {
    return (
      <div>
        <span>Players:</span>
        <div style={{ display: 'flex' }}>
          <Units renderItem={this.renderUnit}
                items={[{name: 'P-1'}, {name: 'P-2'}]}
           />
           <AddUnit onClick={() => alert("addPlayer")}/>
         </div>
      </div>
    )
  }
}


export default Players
