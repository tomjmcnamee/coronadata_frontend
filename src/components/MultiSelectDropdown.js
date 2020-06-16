import React, { useState }  from 'react'
import { useSelector } from 'react-redux'
// import { fetchAllStatesData } from '../actions'


// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import MultiSelect from "react-multi-select-component";

// let selectedID = props.idOfStateInSingleStateGrid
const MultiSelectDropdown: React.FC = () => {

  const store = useSelector(store => store)

  const dropdownOptions = [
    {value: 1, label: "Alabama", state_abbreviation: "AL"},
    {value: 2, label: "Alaska", state_abbreviation: "AK"},
    {value: 3, label: "Arizona", state_abbreviation: "AZ"},
    {value: 4, label: "Arkansas", state_abbreviation: "AR"},
    {value: 5, label: "California", state_abbreviation: "CA"},
    {value: 6, label: "Colorado", state_abbreviation: "CO"},
    {value: 7, label: "Connecticut", state_abbreviation: "CT"},
    {value: 8, label: "Delaware", state_abbreviation: "DE"},
    {value: 9, label: "Florsida", state_abbreviation: "FL"},
    {value: 10, label: "Georgia", state_abbreviation: "GA"},
    {value: 11, label: "Hawaii", state_abbreviation: "HI"},
    {value: 12, label: "sIdaho", state_abbreviation: "sID"},
    {value: 13, label: "Illinois", state_abbreviation: "IL"},
    {value: 14, label: "Indiana", state_abbreviation: "IN"},
    {value: 15, label: "Iowa", state_abbreviation: "IA"},
    {value: 16, label: "Kansas", state_abbreviation: "KS"},
    {value: 17, label: "Kentucky", state_abbreviation: "KY"},
    {value: 18, label: "Louisiana", state_abbreviation: "LA"},
    {value: 19, label: "Maine", state_abbreviation: "ME"},
    {value: 20, label: "Maryland", state_abbreviation: "MD"},
    {value: 21, label: "Massachusetts", state_abbreviation: "MA"},
    {value: 22, label: "Michigan", state_abbreviation: "MI"},
    {value: 23, label: "Minnesota", state_abbreviation: "MN"},
    {value: 24, label: "Mississippi", state_abbreviation: "MS"},
    {value: 25, label: "Missouri", state_abbreviation: "MO"},
    {value: 26, label: "Montana", state_abbreviation: "MT"},
    {value: 27, label: "Nebraska", state_abbreviation: "NE"},
    {value: 28, label: "Nevada", state_abbreviation: "NV"},
    {value: 29, label: "New Hampshire", state_abbreviation: "NH"},
    {value: 30, label: "New Jersey", state_abbreviation: "NJ"},
    {value: 31, label: "New Mexico", state_abbreviation: "NM"},
    {value: 32, label: "New York", state_abbreviation: "NY"},
    {value: 33, label: "North Carolina", state_abbreviation: "NC"},
    {value: 34, label: "North Dakota", state_abbreviation: "ND"},
    {value: 35, label: "Ohio", state_abbreviation: "OH"},
    {value: 36, label: "Oklahoma", state_abbreviation: "OK"},
    {value: 37, label: "Oregon", state_abbreviation: "OR"},
    {value: 38, label: "Pennsylvania", state_abbreviation: "PA"},
    {value: 39, label: "Rhode Island", state_abbreviation: "RI"},
    {value: 40, label: "South Carolina", state_abbreviation: "SC"},
    {value: 41, label: "South Dakota", state_abbreviation: "SD"},
    {value: 42, label: "Tennessee", state_abbreviation: "TN"},
    {value: 43, label: "Texas", state_abbreviation: "TX"},
    {value: 44, label: "Utah", state_abbreviation: "UT"},
    {value: 45, label: "Vermont", state_abbreviation: "VT"},
    {value: 46, label: "Virginia", state_abbreviation: "VA"},
    {value: 47, label: "Washington", state_abbreviation: "WA"},
    {value: 48, label: "Washington DC", state_abbreviation: "DC"},
    {value: 49, label: "West Virginia", state_abbreviation: "WV"},
    {value: 50, label: "Wisconsin", state_abbreviation: "WI"},
    {value: 51, label: "Wyoming", state_abbreviation: "WY"},
    {value: 53, label: "Puerto Rico", state_abbreviation: "PR"},
    {value: [47,37,5, 3,28,31,44,6,51,26,12], label: "REGION - West", state_abbreviation: "R_West"},
    {value: [34,41,27,16,23,15,26, 50,13,14,35,22], label: "REGION - MidWest", state_abbreviation: "R_MidWest"}
    ]
 
  const [selected, setSelected] = useState([]);
  console.log("selected", selected)
  console.log("redux selected state",   store.idOfStateInSingleStateGrid)
 
  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected.state_abbreviation)}</pre>
      <MultiSelect
        options={dropdownOptions}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
};
 


// function mdp(dispatch) {
//   return { 
//     fetchAllStatesData: (countOfDays, fromToDatesValue) => dispatch(fetchAllStatesData(countOfDays, fromToDatesValue))
//   }
// }

// // this comes from reduct.js - K is local reference, V is foreign state attribute
// function msp(state) {
//   return { 
//     staticDatesArr: state.staticDatesArr,
//     fromToDatesValue: state.fromToDatesValue,
//     newPositive: state.newPositive,
//     newNegative: state.newNegative,
//     newPositivePercent: state.newPositivePercent,
//     newDeath: state.newDeath,
//     newTotal: state.newTotal,
//     newHospitalized: state.newHospitalized,
//     totalPositive: state.totalPositive,
//     totalNegative: state.totalNegative,
//     totalDeath: state.totalDeath,
//     totalTotal: state.totalTotal,
//     totalHospitalized: state.totalHospitalized,
//     newOrTotal: state.newOrTotal,
//     includeGridLines: state.includeGridLines,
//     idOfStateInSingleStateGrid: state.idOfStateInSingleStateGrid,
//     selectedStatType: state.selectedStatType,

//   }
// }

export default (MultiSelectDropdown)