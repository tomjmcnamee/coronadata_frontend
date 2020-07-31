import { buildPercentageArrays } from './HelperFunctions/mathFunctions'
import { returnSingleStateDropdownOptionObjWithStateName, returnAllDropdownOptionsForStateMultiselect, returnGroupedStateStatesDropdownObjects, returnGroupObjLabelFromCastedValuesArrString, stateGroupDropdownOptionsArr } from './HelperFunctions/stateRelatedReferences'




// let backendURL = "http://localhost:3000/api/v1/"
// let backendURL = process.env.REACT_APP_FETCH_LOCATION



function fetchAllStatesData (numberOfDays, fromToDatesValue) {
  let startTime = (+ new Date())
  return function (dispatch) {
    ("fetching from actoins")
    dispatch({ type: "SET NEW DEATH", payload: []})
      
      fetch(process.env.REACT_APP_FETCH_LOCATION + "total_stats", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          FetchPW: process.env.REACT_APP_FETCH_PASSWORD,
          numOfDays: numberOfDays
        }
      })
      .then(resp => resp.json())
      .then((response) => {
        let percentages = buildPercentageArrays(response.newTotal, response.newNegative, response.newPositive, response.allDatesArr) 
        if (!!fromToDatesValue)  
        dispatch({ type: "SET FROMTO DATES VALUES", payload: fromToDatesValue}) 
        dispatch({ type: "SET ALL DATES ARRAY", payload: response.allDatesArr})
        dispatch({ type: "SET STATIC DATES ARRAY", payload: [...response.allDatesArr  ].reverse()})
        dispatch({ type: "SET TOTAL NEGATIVE", payload: response.totalNegative})
        dispatch({ type: "SET TOTAL POSITIVE", payload: response.totalPositive })
        dispatch({ type: "SET TOTAL DEATH", payload: response.totalDeath})
        dispatch({ type: "SET TOTAL TOTAL", payload: response.totalTotal})
        dispatch({ type: "SET TOTAL HOSPITALIZED", payload: response.totalHospitalized})
        dispatch({ type: "SET NEW POSITIVE", payload: response.newPositive})
        dispatch({ type: "SET NEW NEGATIVE", payload: response.newNegative})
        dispatch({ type: "SET NEW TOTAL", payload: response.newTotal})
        dispatch({ type: "SET NEW HOSPITALIZED", payload: response.newHospitalized})
        dispatch({ type: "SET NEW POSITIVE PERCENT", payload: percentages[0]})
        dispatch({ type: "SET STAY AT HOME ORDERS", payload: response.stayAtHomeOrders})
        dispatch({ type: "SET NEW DEATH", payload: response.newDeath})
        console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
      })        
  } // ends Thunk middlewear function
} // END fetchStateArr function


function jumpToDisplayAndState (displayType, stateName) {
  return function (dispatch) {
    // dispatch({ type: "SET ID OF STATE IN SINGLE STATE GRID", payload: mapStateNameToStateId(stateName)})

    // dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: mapStateNameToStateId(stateName)})
    if (stateName === "US Totals") {
      dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: returnAllDropdownOptionsForStateMultiselect()})

    } else {
      dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: returnSingleStateDropdownOptionObjWithStateName(stateName)})
    }

    dispatch({ type: "SET DISPLAY TYPE", payload: displayType})
  }
}

function setSelectedStatType (typeName) {
  return function (dispatch) {
    dispatch({ type: "SET SELECTED STAT TYPE", payload: typeName})
  }
}
  
function setNewOrTotal (newOrTotal) {
  return function (dispatch) {
    dispatch({ type: "SET NEW OR TOTAL", payload: newOrTotal})
  }
}
  
function setDisplayType (displayType) {
  return function (dispatch) {
    dispatch({ type: "SET DISPLAY TYPE", payload: displayType})
  }
}
  

function toggleGridlines (gridlineName, newValue) {
  return function (dispatch) {
    dispatch({ type: "UPDATE GRID LINES", payload: [gridlineName, newValue]})
  }
}

function singleInitialLineChooser (selectedStatType) {
  //// all "include" state element neeed to be in global state in order for this to work

  return function (dispatch) {
    if (selectedStatType === "Total") {
      // ("Selecgted stat type = ", selectedStatType)
      dispatch({ type: "SET GRID LINE AS TRUE", payload: "includeTested"})
    } else if (selectedStatType === "Hospitalized" || selectedStatType === "PositivePercent") {
      dispatch({ type: "SET GRID LINE AS TRUE", payload: `include${selectedStatType}`})
    } else {
      dispatch({ type: "SET GRID LINE AS TRUE", payload: `include${selectedStatType}s`})
    }
  }
}


function setMultiSelectedStates (selected) {
  let selectedStatesBelongToThisGroup = []
  let orderedIdsString = selected.map(obj => obj.value).sort((a,b) => a-b).toString()
  let groupObjFromSelectedStatesIdString = returnGroupObjLabelFromCastedValuesArrString(orderedIdsString)
  let stateGroupDropdownSelectionNEW = stateGroupDropdownOptionsArr.find(obj => obj.label ===  groupObjFromSelectedStatesIdString) || []
  selectedStatesBelongToThisGroup.push(stateGroupDropdownSelectionNEW)
  return function (dispatch) {
    dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: selected})
    dispatch({ type: "SET SINGLE SELECTED STATE GROUP ARR", payload: selectedStatesBelongToThisGroup})

  }
}

function setStateGroupSelections (selected, existingSelection) {
  // This set of functions makes the MULTISELECT dropdown function as a SINGLE SELECT dropdowns
    if (selected.length === 0 ) {
      return function (dispatch) {
        dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: []})
        dispatch({ type: "SET SINGLE SELECTED STATE GROUP ARR", payload: []})
      }
    } else if (selected.length === 1 ) {
      let outputArr = returnGroupedStateStatesDropdownObjects(selected[0].label)
      return function (dispatch) {
        dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: outputArr})
        dispatch({ type: "SET SINGLE SELECTED STATE GROUP ARR", payload: selected})
      }
    } else if (selected.length > 1 ) {
      let newSelected = selected.filter(obj => obj.value !== existingSelection[0].value)
      let outputArr = returnGroupedStateStatesDropdownObjects(newSelected[0].label)
      return function (dispatch) {
        dispatch({ type: "SET MULTIPLE SELECTED STATE OBJS", payload: outputArr})
        dispatch({ type: "SET SINGLE SELECTED STATE GROUP ARR", payload: newSelected})
      }
    }
}


export { 
  fetchAllStatesData,
  jumpToDisplayAndState,
  setSelectedStatType,
  setNewOrTotal,
  setDisplayType,
  toggleGridlines,
  singleInitialLineChooser,
  setMultiSelectedStates,
  setStateGroupSelections
}