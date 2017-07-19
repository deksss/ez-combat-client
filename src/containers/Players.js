import React, { Component } from 'react'
import Unit from '../components/Unit'
import Units from '../components/Units'
import AddUnit from '../components/AddUnit'

class Players extends Component {
  renderUnit(unit) {
    return <Unit unit={unit} key={unit.name} />
  }

  render() {
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
           <AddUnit onClick={() => alert("addPlayer")}/>
         </div>
      </div>
    )
  }
}


export default Players
