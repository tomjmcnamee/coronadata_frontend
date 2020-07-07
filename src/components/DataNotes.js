import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

import {
  jumpToDisplayAndState,
} from '../actions'

function DataNotes(props) {
  let heading
  let note
  let astriskCount


  let allNotesArr = []

  if (props.newOrTotal === "new" && (
        (props.selectedStatType === "HospitalizedPercent" && props.displayType === "table" ) || 
        (props.includeGridLines.includeHospitalizedPercent && props.displayType === "multiStateChart") 
       )) {
    heading = "Hospitalization Rate"
    note = `The Hospitalization Rate for each Date shown is derived from this calculation: <br > Day's New Hospitalizations Count divided by Number of new infection 14 days before 'Day' \n  The logic behind this calculation`
    astriskCount = "*"
    let printedNote = note.split('\n').map((item, i) => {
      return <p key={"1"}>{item}</p>;
      });
    allNotesArr.push({heading, printedNote, astriskCount})
  }

  let notesOutput = allNotesArr.map(obj => <Card style={{ width: '99%' }}>
      <Card.Body>
        <Card.Title>{obj.astriskCount}{obj.heading}</Card.Title>
        <Card.Img variant="top" src="/images/HospitalizationRateFormual.png" />
        <Card.Text>
          {obj.printedNote}
        </Card.Text>
      </Card.Body>
    </Card>
  )

      
return <div>
    <h3>DATA NOTES</h3>
    {notesOutput}
  </div>


}






function mdp(dispatch) {
  return { 
    jumpToDisplayAndState: (displayType, stateName) => dispatch(jumpToDisplayAndState(displayType, stateName)),
  }
}

// this comes from reduct.js - K is local reference, V is foreign state attribute
function msp(state) {
  return { 
    fromToDatesValue: state.fromToDatesValue,
    allDatesArr: state.allDatesArr,
    staticDatesArr: state.staticDatesArr,
    newPositive: state.newPositive,
    newNegative: state.newNegative,
    newPositivePercent: state.newPositivePercent,
    newDeath: state.newDeath,
    newTotal: state.newTotal,
    newHospitalized: state.newHospitalized,
    totalPositive: state.totalPositive,
    totalNegative: state.totalNegative,
    totalDeath: state.totalDeath,
    totalTotal: state.totalTotal,
    totalHospitalized: state.totalHospitalized,
    stayAtHomeOrders: state.stayAtHomeOrders,
    idOfStateInSingleStateGrid: state.idOfStateInSingleStateGrid,
    displayType: state.displayType,
    selectedStatType: state.selectedStatType,
    newOrTotal: state.newOrTotal,
    includeGridLines: state.includeGridLines
  }
}

export default connect(msp, mdp)(DataNotes)