import { combineReducers } from 'redux'

let defaultState = {
  fromToDatesValue: [],
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
  stayAtHomeOrders: []
    
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
})

export default reducer