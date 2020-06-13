// import history from './Components/HelperFunctions/history'



let backendURL = "http://localhost:3000/api/v1/"
// let backendURL = "https://yourridehomebackend.localtunnel.me/api/v1/"

// let backendURL = process.env.REACT_APP_FETCH_LOCATION



function fetchAllStatesData (numberOfDays) {
  let startTime = (+ new Date())
  return function (dispatch) {
    fetch( backendURL + "formdata", {
      method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          body: "return_all_form_options"
        }
      })
      .then(resp => resp.json())
      .then(response => {
        console.log("Entire Respoonse FetchStateArr = ", response)
        if (response.error) {
        } else {
            dispatch({ type: "SET ALL FORM OPTIONS", payload: response.allFormOptions })
            dispatch({ type: "SET STATES", payload: response.states })
            dispatch({ type: "SET CITIES", payload: response.cities })
            dispatch({ type: "SET VEHICLE MAKES", payload: response.vehicle_makes })
            console.log("Processing Time for FormsData = ", ((+ new Date()) - startTime)/1000 )
          }
      })
  } // ends Thunk middlewear function
} // END fetchStateArr function
  
  
export { 
  fetchAllStatesData
}