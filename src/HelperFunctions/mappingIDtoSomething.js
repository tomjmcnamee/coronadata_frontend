// const mapMakeIdToMakeName = (allMakes,id) => {
  
//   debugger
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
    case 56: return "Northern Mariana Islands"
    case 99: return "US Totals"

    default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
} // ends mapStateIdToStateName function



export { 
  // mapStateIdToStateAbbreviation,
  mapStateIdToStateName  }