import { buildPercentageArrays } from './HelperFunctions/mathFunctions'



let backendURL = "http://localhost:3000/api/v1/"
// let backendURL = "https://yourridehomebackend.localtunnel.me/api/v1/"

// let backendURL = process.env.REACT_APP_FETCH_LOCATION



function fetchAllStatesData (numberOfDays, fromToDatesValue) {
  let startTime = (+ new Date())
  return function (dispatch) {
    console.log("fetching from actoins")
      // this.setState({
      //   totalDeath: []
      // })
      
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
        if (!!fromToDatesValue)  dispatch({ type: "SET FROMTO DATES VALUES", payload: fromToDatesValue}) 
        dispatch({ type: "SET ALL DATES ARRAY", payload: response.allDatesArr})
        dispatch({ type: "SET STATIC DATES ARRAY", payload: [...response.allDatesArr  ].reverse()})
        dispatch({ type: "SET TOTAL NEGATIVE", payload: response.totalNegative})
        dispatch({ type: "SET TOTAL DEATH", payload: response.totalDeath})
        dispatch({ type: "SET TOTAL TOTAL", payload: response.totalTotal})
        dispatch({ type: "SET TOTAL POSITIVE", payload: response.totalPositive })
        dispatch({ type: "SET TOTAL HOSPITALIZED", payload: response.totalHospitalized})
        dispatch({ type: "SET NEW POSITIVE", payload: response.newPositive})
        dispatch({ type: "SET NEW NEGATIVE", payload: response.newNegative})
        dispatch({ type: "SET NEW DEATH", payload: response.newDeath})
        dispatch({ type: "SET NEW TOTAL", payload: response.newTotal})
        dispatch({ type: "SET NEW HOSPITALIZED", payload: response.newHospitalized})
        dispatch({ type: "SET STAY AT HOME ORDERS", payload: response.stayAtHomeOrders})
        dispatch({ type: "SET NEW POSITIVE PERCENT", payload: percentages[0]})
        console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
      })        
  } // ends Thunk middlewear function
} // END fetchStateArr function


  
  
export { 
  fetchAllStatesData
}