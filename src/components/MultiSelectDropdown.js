import React from 'react'
import { connect } from 'react-redux'


// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import { Multiselect } from 'multiselect-react-dropdown';

class MultiSelectDropown extends React.Component {

  
dropdownOptions = [
{id: [1], state_name: "Alabama", state_abbreviation: "AL"}
{id: [2], state_name: "Alaska", state_abbreviation: "AK"},
{id: [3], state_name: "Arizona", state_abbreviation: "AZ"},
{id: [4], state_name: "Arkansas", state_abbreviation: "AR"},
{id: [5], state_name: "California", state_abbreviation: "CA"},
{id: [6], state_name: "Colorado", state_abbreviation: "CO"},
{id: [7], state_name: "Connecticut", state_abbreviation: "CT"},
{id: [8], state_name: "Delaware", state_abbreviation: "DE"},
{id: [9], state_name: "Florida", state_abbreviation: "FL"},
{id: [10], state_name: "Georgia", state_abbreviation: "GA"},
{id: [11], state_name: "Hawaii", state_abbreviation: "HI"},
{id: [12], state_name: "Idaho", state_abbreviation: "ID"},
{id: [13], state_name: "Illinois", state_abbreviation: "IL"},
{id: [14], state_name: "Indiana", state_abbreviation: "IN"},
{id: [15], state_name: "Iowa", state_abbreviation: "IA"},
{id: [16], state_name: "Kansas", state_abbreviation: "KS"},
{id: [17], state_name: "Kentucky", state_abbreviation: "KY"},
{id: [18], state_name: "Louisiana", state_abbreviation: "LA"},
{id: [19], state_name: "Maine", state_abbreviation: "ME"},
{id: [20], state_name: "Maryland", state_abbreviation: "MD"},
{id: [21], state_name: "Massachusetts", state_abbreviation: "MA"},
{id: [22], state_name: "Michigan", state_abbreviation: "MI"},
{id: [23], state_name: "Minnesota", state_abbreviation: "MN"},
{id: [24], state_name: "Mississippi", state_abbreviation: "MS"},
{id: [25], state_name: "Missouri", state_abbreviation: "MO"},
{id: [26], state_name: "Montana", state_abbreviation: "MT"},
{id: [27], state_name: "Nebraska", state_abbreviation: "NE"},
{id: [28], state_name: "Nevada", state_abbreviation: "NV"},
{id: [29], state_name: "New Hampshire", state_abbreviation: "NH"},
{id: [30], state_name: "New Jersey", state_abbreviation: "NJ"},
{id: [31], state_name: "New Mexico", state_abbreviation: "NM"},
{id: [32], state_name: "New York", state_abbreviation: "NY"},
{id: [33], state_name: "North Carolina", state_abbreviation: "NC"},
{id: [34], state_name: "North Dakota", state_abbreviation: "ND"},
{id: [35], state_name: "Ohio", state_abbreviation: "OH"},
{id: [36], state_name: "Oklahoma", state_abbreviation: "OK"},
{id: [37], state_name: "Oregon", state_abbreviation: "OR"},
{id: [38], state_name: "Pennsylvania", state_abbreviation: "PA"},
{id: [39], state_name: "Rhode Island", state_abbreviation: "RI"},
{id: [40], state_name: "South Carolina", state_abbreviation: "SC"},
{id: [41], state_name: "South Dakota", state_abbreviation: "SD"},
{id: [42], state_name: "Tennessee", state_abbreviation: "TN"},
{id: [43], state_name: "Texas", state_abbreviation: "TX"},
{id: [44], state_name: "Utah", state_abbreviation: "UT"},
{id: [45], state_name: "Vermont", state_abbreviation: "VT"},
{id: [46], state_name: "Virginia", state_abbreviation: "VA"},
{id: [47], state_name: "Washington", state_abbreviation: "WA"},
{id: [48], state_name: "Washington DC", state_abbreviation: "DC"},
{id: [49], state_name: "West Virginia", state_abbreviation: "WV"},
{id: [50], state_name: "Wisconsin", state_abbreviation: "WI"},
{id: [51], state_name: "Wyoming", state_abbreviation: "WY"},
{id: [53], state_name: "Puerto Rico", state_abbreviation: "PR"},
{id: [47,37,5, 3,28,31,44,6,51,26,12], state_name: "REGION - West", state_abbreviation: "R_West"},
{id: [34,41,27,16,23,15,26, 50,13,14,35,22], state_name: "REGION - MidWest", state_abbreviation: "R_MidWest"},
]


  render () {

    return (
      <Multiselect
        options={dropdownOptions} // Options to display in the dropdown
        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        // onSelect={this.onSelect} // Function will trigger on select event
        // onRemove={this.onRemove} // Function will trigger on remove event
        displayValue="state_name" // Property name to display in the dropdown options
        />

    ) // closes primary Return
  } // closees primary Render
}  // ends MultiSelectDropown class

function mdp(dispatch) {
  return { 
    fetchAllStatesData: (countOfDays, fromToDatesValue) => dispatch(fetchAllStatesData(countOfDays, fromToDatesValue))
  }
}

// this comes from reduct.js - K is local reference, V is foreign state attribute
function msp(state) {
  return { 
    staticDatesArr: state.staticDatesArr,
    fromToDatesValue: state.fromToDatesValue,
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
    newOrTotal: state.newOrTotal,
    includeGridLines: state.includeGridLines
  }
}

export default connect(msp, mdp)(MultiSelectDropown)
