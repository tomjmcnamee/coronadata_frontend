import React from 'react'
// import { claimAndUnclaimRide } from '../../actions'
// import { Button, Form } from 'react-bootstrap'
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 





class GridLinesBuilder extends React.Component {

	
	
  render() {
      switch (this.props.gridType) {

        case "AllStates-PerDay":
          let dateData = this.props.allDatesArr.map( date => <td key={date}>{this.props.gridLineObj[date]}</td>)
          // debugger
            return(
            <tr >
              <th className="text-left" >{mapStateIdToStateName(this.props.gridLineObj.state_id)}</th>
              {dateData}
              <th className="text-left" >{mapStateIdToStateName(this.props.gridLineObj.state_id)}</th>
              {/* <td>{this.props.gridLineObj.vehicle_model}</td>
              <td>{this.props.gridLineObj.color}</td>
              <td>{this.props.gridLineObj.state.state_abbreviation} - {this.props.gridLineObj.plate_number}</td> */}
            </tr>
            )  // ends "Campaigns You've Supported" RETURN
        
        default:
      } // ends switch


  } // ends Render
}  // ends GridBuilder class
// this comes from the actions.js function names

export default GridLinesBuilder

