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
  multiSelectedStatesIdsArr: [{"value":1,"label":"Alabama","stateabbreviation":"AL"},{"value":2,"label":"Alaska","stateabbreviation":"AK"},{"value":3,"label":"Arizona","stateabbreviation":"AZ"},{"value":4,"label":"Arkansas","stateabbreviation":"AR"},{"value":5,"label":"California","stateabbreviation":"CA"},{"value":6,"label":"Colorado","stateabbreviation":"CO"},{"value":7,"label":"Connecticut","stateabbreviation":"CT"},{"value":8,"label":"Delaware","stateabbreviation":"DE"},{"value":9,"label":"Florida","stateabbreviation":"FL"},{"value":10,"label":"Georgia","stateabbreviation":"GA"},{"value":11,"label":"Hawaii","stateabbreviation":"HI"},{"value":12,"label":"Idaho","stateabbreviation":"ID"},{"value":13,"label":"Illinois","stateabbreviation":"IL"},{"value":14,"label":"Indiana","stateabbreviation":"IN"},{"value":15,"label":"Iowa","stateabbreviation":"IA"},{"value":16,"label":"Kansas","stateabbreviation":"KS"},{"value":17,"label":"Kentucky","stateabbreviation":"KY"},{"value":18,"label":"Louisiana","stateabbreviation":"LA"},{"value":19,"label":"Maine","stateabbreviation":"ME"},{"value":20,"label":"Maryland","stateabbreviation":"MD"},{"value":21,"label":"Massachusetts","stateabbreviation":"MA"},{"value":22,"label":"Michigan","stateabbreviation":"MI"},{"value":23,"label":"Minnesota","stateabbreviation":"MN"},{"value":24,"label":"Mississippi","stateabbreviation":"MS"},{"value":25,"label":"Missouri","stateabbreviation":"MO"},{"value":26,"label":"Montana","stateabbreviation":"MT"},{"value":27,"label":"Nebraska","stateabbreviation":"NE"},{"value":28,"label":"Nevada","stateabbreviation":"NV"},{"value":29,"label":"New Hampshire","stateabbreviation":"NH"},{"value":30,"label":"New Jersey","stateabbreviation":"NJ"},{"value":31,"label":"New Mexico","stateabbreviation":"NM"},{"value":32,"label":"New York","stateabbreviation":"NY"},{"value":33,"label":"North Carolina","stateabbreviation":"NC"},{"value":34,"label":"North Dakota","stateabbreviation":"ND"},{"value":35,"label":"Ohio","stateabbreviation":"OH"},{"value":36,"label":"Oklahoma","stateabbreviation":"OK"},{"value":37,"label":"Oregon","stateabbreviation":"OR"},{"value":38,"label":"Pennsylvania","stateabbreviation":"PA"},{"value":39,"label":"Rhode Island","stateabbreviation":"RI"},{"value":40,"label":"South Carolina","stateabbreviation":"SC"},{"value":41,"label":"South Dakota","stateabbreviation":"SD"},{"value":42,"label":"Tennessee","stateabbreviation":"TN"},{"value":43,"label":"Texas","stateabbreviation":"TX"},{"value":44,"label":"Utah","stateabbreviation":"UT"},{"value":45,"label":"Vermont","stateabbreviation":"VT"},{"value":46,"label":"Virginia","stateabbreviation":"VA"},{"value":47,"label":"Washington","stateabbreviation":"WA"},{"value":48,"label":"Washington DC","stateabbreviation":"DC"},{"value":49,"label":"West Virginia","stateabbreviation":"WV"},{"value":50,"label":"Wisconsin","stateabbreviation":"WI"},{"value":51,"label":"Wyoming","stateabbreviation":"WY"},{"value":53,"label":"Puerto Rico","stateabbreviation":"PR"}],
  singleSelectStateGroupArr: [],
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

function multiSelectedStatesIdsArrReducer(state = defaultState.multiSelectedStatesIdsArr, action) {
  // debugger
  switch (action.type) {
      case "SET MULTIPLE SELECTED STATE OBJS":
        return action.payload
      case "CLEAR MULTIPLE SELECTED STATE OBJS":
        return []
      default:
          return state
  }
}

function singleSelectStateGroupArrReducer(state = defaultState.singleSelectStateGroupArr, action) {
  // debugger
  switch (action.type) {
      case "SET SINGLE SELECTED STATE GROUP ARR":
        return action.payload
      case "CLEAR SINGLE SELECTED STATE GROUP ARR":
        return []
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
  includeGridLines: includeGridLinesReducer,
  multiSelectedStatesIdsArr: multiSelectedStatesIdsArrReducer,
  singleSelectStateGroupArr: singleSelectStateGroupArrReducer

})

export default reducer