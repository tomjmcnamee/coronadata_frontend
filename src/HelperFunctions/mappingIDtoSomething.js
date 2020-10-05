// const mapMakeIdToMakeName = (allMakes,id) => {
  

//   switch (id) {
//     allMakes.map(obj => "case " + [obj.id] + ": return "+ [obj.make_name])
//     default: return "Correct Status switch/case in HelperFunctions/mappingIDtoSomething.js"
//   } // ends switch/case 
// } // ends mapStatusIdToStatusName function



// const mapStateIdToStateAbbreviation = (id) => {
//   switch (id) {
//     case 1: return "AL"
//     case 2: return "AK"
//     case 3: return "AZ"
//     case 4: return "AR"
//     case 5: return "CA"
//     case 6: return "CO"
//     case 7: return "CT"
//     case 8: return "DE"
//     case 9: return "FL"
//     case 10: return "GA"
//     case 11: return "HI"
//     case 12: return "ID"
//     case 13: return "IL"
//     case 14: return "IN"
//     case 15: return "IA"
//     case 16: return "KS"
//     case 17: return "KY"
//     case 18: return "LA"
//     case 19: return "ME"
//     case 20: return "MD"
//     case 21: return "MA"
//     case 22: return "MI"
//     case 23: return "MN"
//     case 24: return "MS"
//     case 25: return "MO"
//     case 26: return "MT"
//     case 27: return "NE"
//     case 28: return "NV"
//     case 29: return "NH"
//     case 30: return "NJ"
//     case 31: return "NM"
//     case 32: return "NY"
//     case 33: return "NC"
//     case 34: return "ND"
//     case 35: return "OH"
//     case 36: return "OK"
//     case 37: return "OR"
//     case 38: return "PA"
//     case 39: return "RI"
//     case 40: return "SC"
//     case 41: return "SD"
//     case 42: return "TN"
//     case 43: return "TX"
//     case 44: return "UT"
//     case 45: return "VT"
//     case 46: return "VA"
//     case 47: return "WA"
//     case 48: return "DC"
//     case 49: return "WV"
//     case 50: return "WI"
//     case 51: return "WY"
//     // case 52: return "AS"  
//     case 53: return "PR"
//     // case 54: return "VI"
//     // case 55: return "GU"
//     // case 56: return "MP"

//     default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
//   } // ends switch/case 
// } // ends mapStateIdToStateAbbreviation function


const mapStateIdToStateName = (id) => {
  switch (id) {
    case 1: return "Alabama"
    case 2: return "Alaska"
    case 3: return "Arizona"
    case 4: return "Arkansas"
    case 5: return "California"
    case 6: return "Colorado"
    case 7: return "Connecticut"
    case 8: return "Delaware"
    case 9: return "Florida"
    case 10: return "Georgia"
    case 11: return "Hawaii"
    case 12: return "Idaho"
    case 13: return "Illinois"
    case 14: return "Indiana"
    case 15: return "Iowa"
    case 16: return "Kansas"
    case 17: return "Kentucky"
    case 18: return "Louisiana"
    case 19: return "Maine"
    case 20: return "Maryland"
    case 21: return "Massachusetts"
    case 22: return "Michigan"
    case 23: return "Minnesota"
    case 24: return "Mississippi"
    case 25: return "Missouri"
    case 26: return "Montana"
    case 27: return "Nebraska"
    case 28: return "Nevada"
    case 29: return "New Hampshire"
    case 30: return "New Jersey"
    case 31: return "New Mexico"
    case 32: return "New York"
    case 33: return "North Carolina"
    case 34: return "North Dakota"
    case 35: return "Ohio"
    case 36: return "Oklahoma"
    case 37: return "Oregon"
    case 38: return "Pennsylvania"
    case 39: return "Rhode Island"
    case 40: return "South Carolina"
    case 41: return "South Dakota"
    case 42: return "Tennessee"
    case 43: return "Texas"
    case 44: return "Utah"
    case 45: return "Vermont"
    case 46: return "Virginia"
    case 47: return "Washington"
    case 48: return "Washington DC"
    case 49: return "West Virginia"
    case 50: return "Wisconsin"
    case 51: return "Wyoming"
    case 52: return "American Samoa"
    case 53: return "Puerto Rico"
    case 54: return "US Virgin Islands"
    case 55: return "Guam"
    case 56: return "N. Mariana Islands"
    case 99: return "the Entire U.S."

    default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
} // ends mapStateIdToStateName function

const mapStateNameToStateId = (id) => {
  switch (id) {
    case "Alabama": return 1
    case "Alaska": return 2
    case "Arizona": return 3
    case "Arkansas": return 4
    case "California": return 5
    case "Colorado": return 6
    case "Connecticut": return 7
    case "Delaware": return 8
    case "Florida": return 9
    case "Georgia": return 10
    case "Hawaii": return 11
    case "Idaho": return 12
    case "Illinois": return 13
    case "Indiana": return 14
    case "Iowa": return 15
    case "Kansas": return 16
    case "Kentucky": return 17
    case "Louisiana": return 18
    case "Maine": return 19
    case "Maryland": return 20
    case "Massachusetts": return 21
    case "Michigan": return 22
    case "Minnesota": return 23
    case "Mississippi": return 24
    case "Missouri": return 25
    case "Montana": return 26
    case "Nebraska": return 27
    case "Nevada": return 28
    case "New Hampshire": return 29
    case "New Jersey": return 30
    case "New Mexico": return 31
    case "New York": return 32
    case "North Carolina": return 33
    case "North Dakota": return 34
    case "Ohio": return 35
    case "Oklahoma": return 36
    case "Oregon": return 37
    case "Pennsylvania": return 38
    case "Rhode Island": return 39
    case "South Carolina": return 40
    case "South Dakota": return 41
    case "Tennessee": return 42
    case "Texas": return 43
    case "Utah": return 44
    case "Vermont": return 45
    case "Virginia": return 46
    case "Washington": return 47
    case "Washington DC": return 48
    case "West Virginia": return 49
    case "Wisconsin": return 50
    case "Wyoming": return 51
    // case "American Samoa": return 52
    case "Puerto Rico": return 53
    // case "US Virgin Islands": return 54
    // case "Guam": return 55
    // case "N. Mariana Islands": return 56
    case "US Totals": return 99

    default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
} // ends mapStateNameToStateId function

const mapCountTypeToHumanReadableType = (counttype) => {
  switch (counttype) {
    case "new-total": return "Tested"
    case "new-positive": return "Positive"
    case "new-negative": return "Negative"
    case "new-hospitalized": return "Hospitalized"
    case "new-death": return "Deaths"
    case "new-positivePercent": return "Positive %"
    case "total-total": return "Tested"
    case "total-positive": return "Positive"
    case "total-negative": return "Negative"
    case "total-hospitalized": return "Hospitalized"
    case "total-death": return "Deaths"
    case "new-total-avg": return "Total-avg"
    case "new-positive-avg": return "Positive-avg"
    case "new-negative-avg": return "Negative-avg"
    case "new-hospitalized-avg": return "Hospitalized-avg"
    case "new-death-avg": return "Deaths-avg"
    case "new-positivePercent-avg": return "PositivePercent-avg"
    default: return "mapCountTypeToHumanReadableType switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
}

const mapButtonNameToSelectedStatTypeValue = (buttonName) => {
  switch (buttonName) {
    case "includeTested": return "Total"
    case "includeNegatives": return "Negative"
    case "includePositives": return "Positive"
    case "includePositivePercent": return "PositivePercent"
    case "includeHospitalized": return "Hospitalized"
    case "includeDeaths": return "Death"
    default: return "mapButtonNameToSelectedStatTypeValue switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
}

export { 
  // mapStateIdToStateAbbreviation,
  mapStateIdToStateName,
  mapStateNameToStateId,
  mapCountTypeToHumanReadableType,
  mapButtonNameToSelectedStatTypeValue
  }