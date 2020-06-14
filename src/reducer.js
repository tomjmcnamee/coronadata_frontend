import { combineReducers } from 'redux'

let defaultState = {
  fromToDatesValue: null,
  allDatesArr: [],
  staticDatesArr: [],
  newPositive: [],
  newNegative: [],
  newPositivePercent: [],
  newDeath: [],
  newTotal: [],
  newHospitalized: [],
  totalPositive: [],
  totalNegative: [],
  totalDeath: [],
  totalTotal: [],
  totalHospitalized: [],
  stayAtHomeOrders: [],

  idOfStateInSingleStateGrid: "99",
  displayType: "table",
  selectedStatType: "Death",
  newOrTotal: "new",
  includeGridLines: {
    includeTested: false,
    includeNegatives: false,
    includePositives: false,
    includeHospitalized: false,
    includeDeaths: false,
    includePositivePercent: false,
  }
}




function fromToDatesValueReducer(state = defaultState.fromToDatesValue, action) {
  switch (action.type) {
      case "SET FROMTO DATES VALUES":
          return action.payload
      default:
          return state
  }
}

function allDatesArrReducer(state = defaultState.allDatesArr, action) {
  switch (action.type) {
      case "SET ALL DATES ARRAY":
          return action.payload
      default:
          return state
  }
}

function staticDatesArrReducer(state = defaultState.staticDatesArr, action) {
  switch (action.type) {
      case "SET STATIC DATES ARRAY":
          return action.payload
      default:
          return state
  }
}

function newPositiveReducer(state = defaultState.newPositive, action) {
  switch (action.type) {
      case "SET NEW POSITIVE":
          return action.payload
      default:
          return state
  }
}

function newNegativeReducer(state = defaultState.newNegative, action) {
  switch (action.type) {
      case "SET NEW NEGATIVE":
          return action.payload
      default:
          return state
  }
}

function newPositivePercentReducer(state = defaultState.newPositivePercent, action) {
  switch (action.type) {
      case "SET NEW POSITIVE PERCENT":
          return action.payload
      default:
          return state
  }
}

function newDeathReducer(state = defaultState.newDeath, action) {
  switch (action.type) {
      case "SET NEW DEATH":
          return action.payload
      default:
          return state
  }
}

function newTotalReducer(state = defaultState.newTotal, action) {
  switch (action.type) {
      case "SET NEW TOTAL":
          return action.payload
      default:
          return state
  }
}

function newHospitalizedReducer(state = defaultState.newHospitalized, action) {
  switch (action.type) {
      case "SET NEW HOSPITALIZED":
          return action.payload
      default:
          return state
  }
}

function totalPositiveReducer(state = defaultState.totalPositive, action) {
  switch (action.type) {
      case "SET TOTAL POSITIVE":
          return action.payload
      default:
          return state
  }
}

function totalNegativeReducer(state = defaultState.totalNegative, action) {
  switch (action.type) {
      case "SET TOTAL NEGATIVE":
          return action.payload
      default:
          return state
  }
}

function totalDeathReducer(state = defaultState.totalDeath, action) {
  switch (action.type) {
      case "SET TOTAL DEATH":
          return action.payload
      default:
          return state
  }
}

function totalTotalReducer(state = defaultState.totalTotal, action) {
  switch (action.type) {
      case "SET TOTAL TOTAL":
          return action.payload
      default:
          return state
  }
}

function totalHospitalizedReducer(state = defaultState.totalHospitalized, action) {
  switch (action.type) {
      case "SET TOTAL HOSPITALIZED":
          return action.payload
      default:
          return state
  }
}

function stayAtHomeOrdersReducer(state = defaultState.stayAtHomeOrders, action) {
  switch (action.type) {
      case "SET STAY AT HOME ORDERS":
          return action.payload
      default:
          return state
  }
}

function idOfStateInSingleStateGridReducer(state = defaultState.idOfStateInSingleStateGrid, action) {
  switch (action.type) {
      case "SET ID OF STATE IN SINGLE STATE GRID":
          return action.payload
      default:
          return state
  }
}

function displayTypeReducer(state = defaultState.displayType, action) {
  switch (action.type) {
      case "SET DISPLAY TYPE":
          return action.payload
      default:
          return state
  }
}

function selectedStatTypeReducer(state = defaultState.selectedStatType, action) {
  switch (action.type) {
      case "SET SELECTED STAT TYPE":
          return action.payload
      default:
          return state
  }
}

function newOrTotalReducer(state = defaultState.newOrTotal, action) {
  switch (action.type) {
      case "SET NEW OR TOTAL":
          return action.payload
      default:
          return state
  }
}

function includeGridLinesReducer(state = defaultState.includeGridLines, action) {
  switch (action.type) {
      case "UPDATE GRID LINES":
        let k = action.payload[0] 
        let v = action.payload[1]
        return {...state, [k]: v}
      case "SET GRID LINE AS TRUE":
        return {...state, [action.payload]: true}
      default:
          return state
  }
}







let reducer = combineReducers({
  fromToDatesValue: fromToDatesValueReducer,
  allDatesArr: allDatesArrReducer,
  staticDatesArr: staticDatesArrReducer,
  newPositive: newPositiveReducer,
  newNegative: newNegativeReducer,
  newPositivePercent: newPositivePercentReducer,
  newDeath: newDeathReducer,
  newTotal: newTotalReducer,
  newHospitalized: newHospitalizedReducer,
  totalPositive: totalPositiveReducer,
  totalNegative: totalNegativeReducer,
  totalDeath: totalDeathReducer,
  totalTotal: totalTotalReducer,
  totalHospitalized: totalHospitalizedReducer,
  stayAtHomeOrders: stayAtHomeOrdersReducer,
  idOfStateInSingleStateGrid: idOfStateInSingleStateGridReducer,
  displayType: displayTypeReducer, 
  selectedStatType: selectedStatTypeReducer,
  newOrTotal: newOrTotalReducer,
  includeGridLines: includeGridLinesReducer

})

export default reducer