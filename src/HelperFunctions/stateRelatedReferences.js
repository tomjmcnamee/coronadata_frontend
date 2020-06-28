
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

const returnGroupedStateStatesDropdownObjects = (label) => {
  switch (label) {
    case "2016 Clinton States": return [{value: 5, label: "California", stateabbreviation: "CA"},{value: 6, label: "Colorado", stateabbreviation: "CO"},{value: 7, label: "Connecticut", stateabbreviation: "CT"},{value: 8, label: "Delaware", stateabbreviation: "DE"},{value: 48, label: "Washington DC", stateabbreviation: "DC"},{value: 11, label: "Hawaii", stateabbreviation: "HI"},{value: 13, label: "Illinois", stateabbreviation: "IL"},{value: 19, label: "Maine", stateabbreviation: "ME"},{value: 20, label: "Maryland", stateabbreviation: "MD"},{value: 21, label: "Massachusetts", stateabbreviation: "MA"},{value: 23, label: "Minnesota", stateabbreviation: "MN"}, {value: 28, label: "Nevada", stateabbreviation: "NV"},{value: 29, label: "New Hampshire", stateabbreviation: "NH"},{value: 30, label: "New Jersey", stateabbreviation: "NJ"},{value: 31, label: "New Mexico", stateabbreviation: "NM"},{value: 32, label: "New York", stateabbreviation: "NY"},{value: 37, label: "Oregon", stateabbreviation: "OR"},{value: 39, label: "Rhode Island", stateabbreviation: "RI"},{value: 45, label: "Vermont", stateabbreviation: "VT"},{value: 46, label: "Virginia", stateabbreviation: "VA"},{value: 47, label: "Washington", stateabbreviation: "WA"}  ]
    case "2016 Trump States": return [{value: 1, label: "Alabama", stateabbreviation: "AL"},{value: 2, label: "Alaska", stateabbreviation: "AK"},{value: 3, label: "Arizona", stateabbreviation: "AZ"},{value: 4, label: "Arkansas", stateabbreviation: "AR"},{value: 9, label: "Florida", stateabbreviation: "FL"},{value: 10, label: "Georgia", stateabbreviation: "GA"},{value: 12, label: "Idaho", stateabbreviation: "ID"},{value: 14, label: "Indiana", stateabbreviation: "IN"},{value: 15, label: "Iowa", stateabbreviation: "IA"},{value: 16, label: "Kansas", stateabbreviation: "KS"},{value: 17, label: "Kentucky", stateabbreviation: "KY"},{value: 18, label: "Louisiana", stateabbreviation: "LA"},{value: 22, label: "Michigan", stateabbreviation: "MI"},{value: 24, label: "Mississippi", stateabbreviation: "MS"},{value: 25, label: "Missouri", stateabbreviation: "MO"},{value: 26, label: "Montana", stateabbreviation: "MT"},{value: 27, label: "Nebraska", stateabbreviation: "NE"},{value: 33, label: "North Carolina", stateabbreviation: "NC"},{value: 34, label: "North Dakota", stateabbreviation: "ND"},{value: 35, label: "Ohio", stateabbreviation: "OH"},{value: 36, label: "Oklahoma", stateabbreviation: "OK"},{value: 38, label: "Pennsylvania", stateabbreviation: "PA"},{value: 40, label: "South Carolina", stateabbreviation: "SC"},{value: 41, label: "South Dakota", stateabbreviation: "SD"},{value: 42, label: "Tennessee", stateabbreviation: "TN"},{value: 43, label: "Texas", stateabbreviation: "TX"},{value: 44, label: "Utah", stateabbreviation: "UT"},{value: 49, label: "West Virginia", stateabbreviation: "WV"},{value: 50, label: "Wisconsin", stateabbreviation: "WI"},{value: 51, label: "Wyoming", stateabbreviation: "WY"}]
    case "GOVERNOR - Dem": return [{value: 5, label: "California", stateabbreviation: "CA"},{value: 6, label: "Colorado", stateabbreviation: "CO"},{value: 7, label: "Connecticut", stateabbreviation: "CT"},{value: 8, label: "Delaware", stateabbreviation: "DE"},{value: 11, label: "Hawaii", stateabbreviation: "HI"},{value: 13, label: "Illinois", stateabbreviation: "IL"},{value: 16, label: "Kansas", stateabbreviation: "KS"},{value: 17, label: "Kentucky", stateabbreviation: "KY"},{value: 18, label: "Louisiana", stateabbreviation: "LA"},{value: 19, label: "Maine", stateabbreviation: "ME"},{value: 22, label: "Michigan", stateabbreviation: "MI"},{value: 23, label: "Minnesota", stateabbreviation: "MN"},{value: 26, label: "Montana", stateabbreviation: "MT"},{value: 28, label: "Nevada", stateabbreviation: "NV"},{value: 30, label: "New Jersey", stateabbreviation: "NJ"},{value: 31, label: "New Mexico", stateabbreviation: "NM"},{value: 32, label: "New York", stateabbreviation: "NY"},{value: 33, label: "North Carolina", stateabbreviation: "NC"},{value: 37, label: "Oregon", stateabbreviation: "OR"},{value: 38, label: "Pennsylvania", stateabbreviation: "PA"},{value: 39, label: "Rhode Island", stateabbreviation: "RI"},{value: 46, label: "Virginia", stateabbreviation: "VA"},{value: 47, label: "Washington", stateabbreviation: "WA"},{value: 50, label: "Wisconsin", stateabbreviation: "WI"}]
    case "GOVERNOR - Rep": return [{value: 1, label: "Alabama", stateabbreviation: "AL"},{value: 2, label: "Alaska", stateabbreviation: "AK"},{value: 3, label: "Arizona", stateabbreviation: "AZ"},{value: 4, label: "Arkansas", stateabbreviation: "AR"}, {value: 9, label: "Florida", stateabbreviation: "FL"}, {value: 10, label: "Georgia", stateabbreviation: "GA"},{value: 12, label: "Idaho", stateabbreviation: "ID"},{value: 14, label: "Indiana", stateabbreviation: "IN"},{value: 15, label: "Iowa", stateabbreviation: "IA"},{value: 20, label: "Maryland", stateabbreviation: "MD"},{value: 21, label: "Massachusetts", stateabbreviation: "MA"},{value: 24, label: "Mississippi", stateabbreviation: "MS"},{value: 25, label: "Missouri", stateabbreviation: "MO"},{value: 27, label: "Nebraska", stateabbreviation: "NE"},{value: 29, label: "New Hampshire", stateabbreviation: "NH"},{value: 34, label: "North Dakota", stateabbreviation: "ND"},{value: 35, label: "Ohio", stateabbreviation: "OH"},{value: 36, label: "Oklahoma", stateabbreviation: "OK"},{value: 40, label: "South Carolina", stateabbreviation: "SC"},{value: 41, label: "South Dakota", stateabbreviation: "SD"},{value: 42, label: "Tennessee", stateabbreviation: "TN"},{value: 43, label: "Texas", stateabbreviation: "TX"},{value: 44, label: "Utah", stateabbreviation: "UT"},{value: 45, label: "Vermont", stateabbreviation: "VT"},{value: 49, label: "West Virginia", stateabbreviation: "WV"},{value: 51, label: "Wyoming", stateabbreviation: "WY"}]
    case "REGION - NorthEast": return [{value: 7, label: "Connecticut", stateabbreviation: "CT"},{value: 19, label: "Maine", stateabbreviation: "ME"},{value: 21, label: "Massachusetts", stateabbreviation: "MA"}, {value: 29, label: "New Hampshire", stateabbreviation: "NH"},{value: 39, label: "Rhode Island", stateabbreviation: "RI"},{value: 45, label: "Vermont", stateabbreviation: "VT"},{value: 30, label: "New Jersey", stateabbreviation: "NJ"},{value: 32, label: "New York", stateabbreviation: "NY"},{value: 38, label: "Pennsylvania", stateabbreviation: "PA"}]
    case "DIV - New England": return [{value: 7, label: "Connecticut", stateabbreviation: "CT"},{value: 19, label: "Maine", stateabbreviation: "ME"},{value: 21, label: "Massachusetts", stateabbreviation: "MA"}, {value: 29, label: "New Hampshire", stateabbreviation: "NH"},{value: 39, label: "Rhode Island", stateabbreviation: "RI"},{value: 45, label: "Vermont", stateabbreviation: "VT"}]
    case "DIV - Mid-Atlantic": return [{value: 30, label: "New Jersey", stateabbreviation: "NJ"},{value: 32, label: "New York", stateabbreviation: "NY"},{value: 38, label: "Pennsylvania", stateabbreviation: "PA"}]
    case "REGION - Midwest": return [{value: 13, label: "Illinois", stateabbreviation: "IL"},{value: 14, label: "Indiana", stateabbreviation: "IN"},{value: 22, label: "Michigan", stateabbreviation: "MI"},{value: 35, label: "Ohio", stateabbreviation: "OH"},{value: 50, label: "Wisconsin", stateabbreviation: "WI"},{value: 15, label: "Iowa", stateabbreviation: "IA"},{value: 16, label: "Kansas", stateabbreviation: "KS"},{value: 23, label: "Minnesota", stateabbreviation: "MN"},{value: 25, label: "Missouri", stateabbreviation: "MO"},{value: 27, label: "Nebraska", stateabbreviation: "NE"},{value: 34, label: "North Dakota", stateabbreviation: "ND"},{value: 41, label: "South Dakota", stateabbreviation: "SD"}]
    case "DIV - E.N. Central": return [{value: 13, label: "Illinois", stateabbreviation: "IL"},{value: 14, label: "Indiana", stateabbreviation: "IN"},{value: 22, label: "Michigan", stateabbreviation: "MI"},{value: 35, label: "Ohio", stateabbreviation: "OH"},{value: 50, label: "Wisconsin", stateabbreviation: "WI"}]
    case "DIV - W.N. Central": return [{value: 15, label: "Iowa", stateabbreviation: "IA"},{value: 16, label: "Kansas", stateabbreviation: "KS"},{value: 23, label: "Minnesota", stateabbreviation: "MN"},{value: 25, label: "Missouri", stateabbreviation: "MO"},{value: 27, label: "Nebraska", stateabbreviation: "NE"},{value: 34, label: "North Dakota", stateabbreviation: "ND"},{value: 41, label: "South Dakota", stateabbreviation: "SD"}]
    case "REGION - South": return [{value: 8, label: "Delaware", stateabbreviation: "DE"},{value: 9, label: "Florida", stateabbreviation: "FL"},{value: 10, label: "Georgia", stateabbreviation: "GA"},{value: 20, label: "Maryland", stateabbreviation: "MD"},{value: 33, label: "North Carolina", stateabbreviation: "NC"},{value: 40, label: "South Carolina", stateabbreviation: "SC"},{value: 46, label: "Virginia", stateabbreviation: "VA"},{value: 48, label: "Washington DC", stateabbreviation: "DC"},{value: 49, label: "West Virginia", stateabbreviation: "WV"},{value: 1, label: "Alabama", stateabbreviation: "AL"},{value: 17, label: "Kentucky", stateabbreviation: "KY"},{value: 24, label: "Mississippi", stateabbreviation: "MS"},{value: 42, label: "Tennessee", stateabbreviation: "TN"},{value: 4, label: "Arkansas", stateabbreviation: "AR"},{value: 18, label: "Louisiana", stateabbreviation: "LA"},{value: 36, label: "Oklahoma", stateabbreviation: "OK"},{value: 43, label: "Texas", stateabbreviation: "TX"}]
    case "DIV - S. Atlantic": return [{value: 8, label: "Delaware", stateabbreviation: "DE"},{value: 9, label: "Florida", stateabbreviation: "FL"},{value: 10, label: "Georgia", stateabbreviation: "GA"},{value: 20, label: "Maryland", stateabbreviation: "MD"},{value: 33, label: "North Carolina", stateabbreviation: "NC"},{value: 40, label: "South Carolina", stateabbreviation: "SC"},{value: 46, label: "Virginia", stateabbreviation: "VA"},{value: 48, label: "Washington DC", stateabbreviation: "DC"},{value: 49, label: "West Virginia", stateabbreviation: "WV"}]
    case "DIV - E.S. Central": return [{value: 1, label: "Alabama", stateabbreviation: "AL"},{value: 17, label: "Kentucky", stateabbreviation: "KY"},{value: 24, label: "Mississippi", stateabbreviation: "MS"},{value: 42, label: "Tennessee", stateabbreviation: "TN"}]
    case "DIV - W.S. Central": return [{value: 4, label: "Arkansas", stateabbreviation: "AR"},{value: 18, label: "Louisiana", stateabbreviation: "LA"},{value: 36, label: "Oklahoma", stateabbreviation: "OK"},{value: 43, label: "Texas", stateabbreviation: "TX"}]
    case "REGION - West": return [{value: 3, label: "Arizona", stateabbreviation: "AZ"},{value: 6, label: "Colorado", stateabbreviation: "CO"},{value: 12, label: "Idaho", stateabbreviation: "ID"},{value: 26, label: "Montana", stateabbreviation: "MT"},{value: 28, label: "Nevada", stateabbreviation: "NV"},{value: 31, label: "New Mexico", stateabbreviation: "NM"},{value: 44, label: "Utah", stateabbreviation: "UT"},{value: 51, label: "Wyoming", stateabbreviation: "WY"},{value: 2, label: "Alaska", stateabbreviation: "AK"},{value: 5, label: "California", stateabbreviation: "CA"},{value: 11, label: "Hawaii", stateabbreviation: "HI"},{value: 37, label: "Oregon", stateabbreviation: "OR"},{value: 47, label: "Washington", stateabbreviation: "WA"}]
    case "DIV - Mountain": return [{value: 3, label: "Arizona", stateabbreviation: "AZ"},{value: 6, label: "Colorado", stateabbreviation: "CO"},{value: 12, label: "Idaho", stateabbreviation: "ID"},{value: 26, label: "Montana", stateabbreviation: "MT"},{value: 28, label: "Nevada", stateabbreviation: "NV"},{value: 31, label: "New Mexico", stateabbreviation: "NM"},{value: 44, label: "Utah", stateabbreviation: "UT"},{value: 51, label: "Wyoming", stateabbreviation: "WY"}]
    case "DIV - Pacific": return [{value: 2, label: "Alaska", stateabbreviation: "AK"},{value: 5, label: "California", stateabbreviation: "CA"},{value: 11, label: "Hawaii", stateabbreviation: "HI"},{value: 37, label: "Oregon", stateabbreviation: "OR"},{value: 47, label: "Washington", stateabbreviation: "WA"}]
    default: return []
  } // ends switch/case 
}
const returnGroupObjLabelFromCastedValuesArrString = (CastedValuesArrString) => {
  switch (CastedValuesArrString) {
    
    case "5,6,7,8,11,13,19,20,21,23,28,29,30,31,32,37,39,45,46,47,48": return "2016 Clinton States"
    case "1,2,3,4,9,10,12,14,15,16,17,18,22,24,25,26,27,33,34,35,36,38,40,41,42,43,44,49,50,51": return "2016 Trump States"
    case "5,6,7,8,11,13,16,17,18,19,22,23,26,28,30,31,32,33,37,38,39,46,47,50": return "GOVERNOR - Dem" 
    case "1,2,3,4,9,10,12,14,15,20,21,24,25,27,29,34,35,36,40,41,42,43,44,45,49,51": return "GOVERNOR - Rep"
    case "7,19,21,29,30,32,38,39,45": return "REGION - NorthEast"
    case "13,14,15,16,22,23,25,27,34,35,41,50": return "REGION - Midwest"
    case "1,4,8,9,10,17,18,20,24,33,36,40,42,43,46,48,49": return "REGION - South"
    case "2,3,5,6,11,12,26,28,31,37,44,47,51": return "REGION - West"
    case "7,19,21,29,39,45": return "DIV - New England"
    case "30,32,38": return "DIV - Mid-Atlantic"
    case "13,14,22,35,50": return "DIV - E.N. Central"
    case "15,16,23,25,27,34,41": return "DIV - W.N. Central"
    case "8,9,10,20,33,40,46,48,49": return "DIV - S. Atlantic"
    case "1,17,24,42": return "DIV - E.S. Central"
    case "4,18,36,43": return "DIV - W.S. Central"
    case "3,6,12,26,28,31,44,51": return "DIV - Mountain"
    case "2,5,11,37,47": return "DIV - Pacific"
    default: return "returnGroupedStateStatesDropdownObjects switch  case in HelperFunctions/stateRelatedReferences.js"
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
    {value: 53, label: "Puerto Rico", stateabbreviation: "PR"}
    ]
}

const stateGroupDropdownOptionsArr = [
    {value: 116, label: "2016 Clinton States", stateabbreviation: "Clinton"},
    {value: 117, label: "2016 Trump States", stateabbreviation: "Trump"},
    {value: 101, label: "GOVERNOR - Dem", stateabbreviation: "DEM"},
    {value: 102, label: "GOVERNOR - Rep", stateabbreviation: "REP"},
    {value: 103, label: "REGION - NorthEast", stateabbreviation: "NorthEast"},
    {value: 107, label: "DIV - New England", stateabbreviation: "NewEngland"},
    {value: 108, label: "DIV - Mid-Atlantic", stateabbreviation: "MidAtl"},
    {value: 104, label: "REGION - Midwest", stateabbreviation: "MidWest"},
    {value: 109, label: "DIV - E.N. Central", stateabbreviation: "ENC"},
    {value: 110, label: "DIV - W.N. Central", stateabbreviation: "WNC"},
    {value: 105, label: "REGION - South", stateabbreviation: "South"},
    {value: 111, label: "DIV - S. Atlantic", stateabbreviation: "SAtlantic"},
    {value: 112, label: "DIV - E.S. Central", stateabbreviation: "ES Central"},
    {value: 113, label: "DIV - W.S. Central", stateabbreviation: "WS Central"},
    {value: 106, label: "REGION - West", stateabbreviation: "West"},
    {value: 114, label: "DIV - Mountain", stateabbreviation: "Mountain"},
    {value: 115, label: "DIV - Pacific", stateabbreviation: "Pacific"}
    ]


export { 
  returnAllDropdownOptionsForStateMultiselect,
  returnSingleStateDropdownOptionObjWithStateName,
  returnGroupedStateStatesDropdownObjects,
  stateGroupDropdownOptionsArr,
  returnGroupObjLabelFromCastedValuesArrString
 }