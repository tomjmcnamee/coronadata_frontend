
const returnSingleStateDropdownOptionObjWithStateName = (stateName) => {
  switch (stateName) {
    case "Alabama": return [{value: 1, label: "Alabama", stateabbreviation: "AL"}]
    case "Alaska": return [{value: 2, label: "Alaska", stateabbreviation: "AK"}]
    case "Arizona": return [{value: 3, label: "Arizona", stateabbreviation: "AZ"}]
    case "Arkansas": return [{value: 4, label: "Arkansas", stateabbreviation: "AR"}]
    case "California": return [{value: 5, label: "California", stateabbreviation: "CA"}]
    case "Colorado": return [{value: 6, label: "Colorado", stateabbreviation: "CO"}]
    case "Connecticut": return [{value: 7, label: "Connecticut", stateabbreviation: "CT"}]
    case "Delaware": return [{value: 8, label: "Delaware", stateabbreviation: "DE"}]
    case "Florida": return [{value: 9, label: "Florida", stateabbreviation: "FL"}]
    case "Georgia": return [{value: 10, label: "Georgia", stateabbreviation: "GA"}]
    case "Hawaii": return [{value: 11, label: "Hawaii", stateabbreviation: "HI"}]
    case "Idaho": return [{value: 12, label: "Idaho", stateabbreviation: "ID"}]
    case "Illinois": return [{value: 13, label: "Illinois", stateabbreviation: "IL"}]
    case "Indiana": return [{value: 14, label: "Indiana", stateabbreviation: "IN"}]
    case "Iowa": return [{value: 15, label: "Iowa", stateabbreviation: "IA"}]
    case "Kansas": return [{value: 16, label: "Kansas", stateabbreviation: "KS"}]
    case "Kentucky": return [{value: 17, label: "Kentucky", stateabbreviation: "KY"}]
    case "Louisiana": return [{value: 18, label: "Louisiana", stateabbreviation: "LA"}]
    case "Maine": return [{value: 19, label: "Maine", stateabbreviation: "ME"}]
    case "Maryland": return [{value: 20, label: "Maryland", stateabbreviation: "MD"}]
    case "Massachusetts": return [{value: 21, label: "Massachusetts", stateabbreviation: "MA"}]
    case "Michigan": return [{value: 22, label: "Michigan", stateabbreviation: "MI"}]
    case "Minnesota": return [{value: 23, label: "Minnesota", stateabbreviation: "MN"}]
    case "Mississippi": return [{value: 24, label: "Mississippi", stateabbreviation: "MS"}]
    case "Missouri": return [{value: 25, label: "Missouri", stateabbreviation: "MO"}]
    case "Montana": return [{value: 26, label: "Montana", stateabbreviation: "MT"}]
    case "Nebraska": return [{value: 27, label: "Nebraska", stateabbreviation: "NE"}]
    case "Nevada": return [{value: 28, label: "Nevada", stateabbreviation: "NV"}]
    case "New Hampshire": return [{value: 29, label: "New Hampshire", stateabbreviation: "NH"}]
    case "New Jersey": return [{value: 30, label: "New Jersey", stateabbreviation: "NJ"}]
    case "New Mexico": return [{value: 31, label: "New Mexico", stateabbreviation: "NM"}]
    case "New York": return [{value: 32, label: "New York", stateabbreviation: "NY"}]
    case "North Carolina": return [{value: 33, label: "North Carolina", stateabbreviation: "NC"}]
    case "North Dakota": return [{value: 34, label: "North Dakota", stateabbreviation: "ND"}]
    case "Ohio": return [{value: 35, label: "Ohio", stateabbreviation: "OH"}]
    case "Oklahoma": return [{value: 36, label: "Oklahoma", stateabbreviation: "OK"}]
    case "Oregon": return [{value: 37, label: "Oregon", stateabbreviation: "OR"}]
    case "Pennsylvania": return [{value: 38, label: "Pennsylvania", stateabbreviation: "PA"}]
    case "Rhode Island": return [{value: 39, label: "Rhode Island", stateabbreviation: "RI"}]
    case "South Carolina": return [{value: 40, label: "South Carolina", stateabbreviation: "SC"}]
    case "South Dakota": return [{value: 41, label: "South Dakota", stateabbreviation: "SD"}]
    case "Tennessee": return [{value: 42, label: "Tennessee", stateabbreviation: "TN"}]
    case "Texas": return [{value: 43, label: "Texas", stateabbreviation: "TX"}]
    case "Utah": return [{value: 44, label: "Utah", stateabbreviation: "UT"}]
    case "Vermont": return [{value: 45, label: "Vermont", stateabbreviation: "VT"}]
    case "Virginia": return [{value: 46, label: "Virginia", stateabbreviation: "VA"}]
    case "Washington": return [{value: 47, label: "Washington", stateabbreviation: "WA"}]
    case "Washington DC": return [{value: 48, label: "Washington DC", stateabbreviation: "DC"}]
    case "West Virginia": return [{value: 49, label: "West Virginia", stateabbreviation: "WV"}]
    case "Wisconsin": return [{value: 50, label: "Wisconsin", stateabbreviation: "WI"}]
    case "Wyoming": return [{value: 51, label: "Wyoming", stateabbreviation: "WY"}]
    case "Puerto Rico": return [{value: 53, label: "Puerto Rico", stateabbreviation: "PR"}]

    default: return "returnSingleStateDropdownOptionObjWithStateName switch  case in HelperFunctions/stateRelatedReferences.js"
  } // ends switch/case 
}

const returnAllDropdownOptionsForStateMultiselect = () => {
  return [
    {value: 1, label: "Alabama", stateabbreviation: "AL"},
    {value: 2, label: "Alaska", stateabbreviation: "AK"},
    {value: 3, label: "Arizona", stateabbreviation: "AZ"},
    {value: 4, label: "Arkansas", stateabbreviation: "AR"},
    {value: 5, label: "California", stateabbreviation: "CA"},
    {value: 6, label: "Colorado", stateabbreviation: "CO"},
    {value: 7, label: "Connecticut", stateabbreviation: "CT"},
    {value: 8, label: "Delaware", stateabbreviation: "DE"},
    {value: 9, label: "Florida", stateabbreviation: "FL"},
    {value: 10, label: "Georgia", stateabbreviation: "GA"},
    {value: 11, label: "Hawaii", stateabbreviation: "HI"},
    {value: 12, label: "Idaho", stateabbreviation: "ID"},
    {value: 13, label: "Illinois", stateabbreviation: "IL"},
    {value: 14, label: "Indiana", stateabbreviation: "IN"},
    {value: 15, label: "Iowa", stateabbreviation: "IA"},
    {value: 16, label: "Kansas", stateabbreviation: "KS"},
    {value: 17, label: "Kentucky", stateabbreviation: "KY"},
    {value: 18, label: "Louisiana", stateabbreviation: "LA"},
    {value: 19, label: "Maine", stateabbreviation: "ME"},
    {value: 20, label: "Maryland", stateabbreviation: "MD"},
    {value: 21, label: "Massachusetts", stateabbreviation: "MA"},
    {value: 22, label: "Michigan", stateabbreviation: "MI"},
    {value: 23, label: "Minnesota", stateabbreviation: "MN"},
    {value: 24, label: "Mississippi", stateabbreviation: "MS"},
    {value: 25, label: "Missouri", stateabbreviation: "MO"},
    {value: 26, label: "Montana", stateabbreviation: "MT"},
    {value: 27, label: "Nebraska", stateabbreviation: "NE"},
    {value: 28, label: "Nevada", stateabbreviation: "NV"},
    {value: 29, label: "New Hampshire", stateabbreviation: "NH"},
    {value: 30, label: "New Jersey", stateabbreviation: "NJ"},
    {value: 31, label: "New Mexico", stateabbreviation: "NM"},
    {value: 32, label: "New York", stateabbreviation: "NY"},
    {value: 33, label: "North Carolina", stateabbreviation: "NC"},
    {value: 34, label: "North Dakota", stateabbreviation: "ND"},
    {value: 35, label: "Ohio", stateabbreviation: "OH"},
    {value: 36, label: "Oklahoma", stateabbreviation: "OK"},
    {value: 37, label: "Oregon", stateabbreviation: "OR"},
    {value: 38, label: "Pennsylvania", stateabbreviation: "PA"},
    {value: 39, label: "Rhode Island", stateabbreviation: "RI"},
    {value: 40, label: "South Carolina", stateabbreviation: "SC"},
    {value: 41, label: "South Dakota", stateabbreviation: "SD"},
    {value: 42, label: "Tennessee", stateabbreviation: "TN"},
    {value: 43, label: "Texas", stateabbreviation: "TX"},
    {value: 44, label: "Utah", stateabbreviation: "UT"},
    {value: 45, label: "Vermont", stateabbreviation: "VT"},
    {value: 46, label: "Virginia", stateabbreviation: "VA"},
    {value: 47, label: "Washington", stateabbreviation: "WA"},
    {value: 48, label: "Washington DC", stateabbreviation: "DC"},
    {value: 49, label: "West Virginia", stateabbreviation: "WV"},
    {value: 50, label: "Wisconsin", stateabbreviation: "WI"},
    {value: 51, label: "Wyoming", stateabbreviation: "WY"},
    {value: 53, label: "Puerto Rico", stateabbreviation: "PR"},
    // {value: 80, label: "REGION - West", stateabbreviation: "R_West"},
    // {value: 81, label: "REGION - MidWest", stateabbreviation: "R_MidWest"}
    ]
}

export { 
  returnAllDropdownOptionsForStateMultiselect,
  returnSingleStateDropdownOptionObjWithStateName
 }