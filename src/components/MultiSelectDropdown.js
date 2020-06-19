// import React, { useState }  from 'react'
// import { useSelector } from 'react-redux'
// import { mapMultiDropdownValueToRegionIDsArr } from '../HelperFunctions/mappingIDtoSomething' 


// // import Table  from 'react-bootstrap/Table'
// // import LineChart from "@rsuite/charts/lib/charts/LineChart";
// import MultiSelect from "react-multi-select-component";

// // let selectedID = props.idOfStateInSingleStateGrid





// const MultiSelectDropdown: React.FC = (props) => {
  


//   // React.useEffect(() => {
//   //   props.setMultiSelectedStates(selected)
//   // }, []);


//   //  THIS ONE WAS WORKING AS GOOD HOOKS -----------------------------
//   // const store = useSelector(store => store)


//   // const [state, dispatch] = React.useReducer(reducer, defaultState);


//   // const storeF = useEffect(store => store)
   

//   const dropdownOptions = [
//     {value: 1, label: "Alabama", stateabbreviation: "AL"},
//     {value: 2, label: "Alaska", stateabbreviation: "AK"},
//     {value: 3, label: "Arizona", stateabbreviation: "AZ"},
//     {value: 4, label: "Arkansas", stateabbreviation: "AR"},
//     {value: 5, label: "California", stateabbreviation: "CA"},
//     {value: 6, label: "Colorado", stateabbreviation: "CO"},
//     {value: 7, label: "Connecticut", stateabbreviation: "CT"},
//     {value: 8, label: "Delaware", stateabbreviation: "DE"},
//     {value: 9, label: "Florida", stateabbreviation: "FL"},
//     {value: 10, label: "Georgia", stateabbreviation: "GA"},
//     {value: 11, label: "Hawaii", stateabbreviation: "HI"},
//     {value: 12, label: "Idaho", stateabbreviation: "ID"},
//     {value: 13, label: "Illinois", stateabbreviation: "IL"},
//     {value: 14, label: "Indiana", stateabbreviation: "IN"},
//     {value: 15, label: "Iowa", stateabbreviation: "IA"},
//     {value: 16, label: "Kansas", stateabbreviation: "KS"},
//     {value: 17, label: "Kentucky", stateabbreviation: "KY"},
//     {value: 18, label: "Louisiana", stateabbreviation: "LA"},
//     {value: 19, label: "Maine", stateabbreviation: "ME"},
//     {value: 20, label: "Maryland", stateabbreviation: "MD"},
//     {value: 21, label: "Massachusetts", stateabbreviation: "MA"},
//     {value: 22, label: "Michigan", stateabbreviation: "MI"},
//     {value: 23, label: "Minnesota", stateabbreviation: "MN"},
//     {value: 24, label: "Mississippi", stateabbreviation: "MS"},
//     {value: 25, label: "Missouri", stateabbreviation: "MO"},
//     {value: 26, label: "Montana", stateabbreviation: "MT"},
//     {value: 27, label: "Nebraska", stateabbreviation: "NE"},
//     {value: 28, label: "Nevada", stateabbreviation: "NV"},
//     {value: 29, label: "New Hampshire", stateabbreviation: "NH"},
//     {value: 30, label: "New Jersey", stateabbreviation: "NJ"},
//     {value: 31, label: "New Mexico", stateabbreviation: "NM"},
//     {value: 32, label: "New York", stateabbreviation: "NY"},
//     {value: 33, label: "North Carolina", stateabbreviation: "NC"},
//     {value: 34, label: "North Dakota", stateabbreviation: "ND"},
//     {value: 35, label: "Ohio", stateabbreviation: "OH"},
//     {value: 36, label: "Oklahoma", stateabbreviation: "OK"},
//     {value: 37, label: "Oregon", stateabbreviation: "OR"},
//     {value: 38, label: "Pennsylvania", stateabbreviation: "PA"},
//     {value: 39, label: "Rhode Island", stateabbreviation: "RI"},
//     {value: 40, label: "South Carolina", stateabbreviation: "SC"},
//     {value: 41, label: "South Dakota", stateabbreviation: "SD"},
//     {value: 42, label: "Tennessee", stateabbreviation: "TN"},
//     {value: 43, label: "Texas", stateabbreviation: "TX"},
//     {value: 44, label: "Utah", stateabbreviation: "UT"},
//     {value: 45, label: "Vermont", stateabbreviation: "VT"},
//     {value: 46, label: "Virginia", stateabbreviation: "VA"},
//     {value: 47, label: "Washington", stateabbreviation: "WA"},
//     {value: 48, label: "Washington DC", stateabbreviation: "DC"},
//     {value: 49, label: "West Virginia", stateabbreviation: "WV"},
//     {value: 50, label: "Wisconsin", stateabbreviation: "WI"},
//     {value: 51, label: "Wyoming", stateabbreviation: "WY"},
//     {value: 53, label: "Puerto Rico", stateabbreviation: "PR"},
//     {value: 80, label: "REGION - West", stateabbreviation: "R_West"},
//     {value: 81, label: "REGION - MidWest", stateabbreviation: "R_MidWest"}
//     ]
 
//   const [selected, setSelected] = useState([]);



  


 

//   return (
//     <div>
//       <h5>Select States to Include In Chart</h5>
//       {/* <pre>{JSON.stringify(selectedDropdownOptions().label)}</pre> */}
//       <MultiSelect
//         options={dropdownOptions}
//         value={selected}
//         // value={selectedDropdownOptions}
//         onChange={setSelected}
//         // onChange={function(){callbacks(function(){setSelected()})}}
//         labelledBy={"Select"}
//         hasSelectAll
//       />
//       <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="table" active onClick={() => props.setMultiSelectedStates(selected)}>
//         Submit
//       </Button>
//     </div>
//   );
// };
 



// export default (MultiSelectDropdown)

// // function mdp(dispatch) {
//   //   return { 
//     //     fetchAllStatesData: (countOfDays, fromToDatesValue) => dispatch(fetchAllStatesData(countOfDays, fromToDatesValue))
//     //   }
// // }

// // // this comes from reduct.js - K is local reference, V is foreign state attribute
// // function msp(state) {
//   //   return { 
//     //     staticDatesArr: state.staticDatesArr,
//     //     fromToDatesValue: state.fromToDatesValue,
// //     newPositive: state.newPositive,
// //     newNegative: state.newNegative,
// //     newPositivePercent: state.newPositivePercent,
// //     newDeath: state.newDeath,
// //     newTotal: state.newTotal,
// //     newHospitalized: state.newHospitalized,
// //     totalPositive: state.totalPositive,
// //     totalNegative: state.totalNegative,
// //     totalDeath: state.totalDeath,
// //     totalTotal: state.totalTotal,
// //     totalHospitalized: state.totalHospitalized,
// //     newOrTotal: state.newOrTotal,
// //     includeGridLines: state.includeGridLines,
// //     idOfStateInSingleStateGrid: state.idOfStateInSingleStateGrid,
// //     selectedStatType: state.selectedStatType,

// //   }
// // }

// // export default connect(msp, mdp)(MultiSelectDropdown)