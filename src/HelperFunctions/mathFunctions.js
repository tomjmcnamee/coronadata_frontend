const buildPercentageArrays = (newTotal, newNegative, newPositive, allDatesArr) => {
  let newPositivePercentArr = []
  for (let totalObj of newTotal) {
    let newPosObj = {state_id: totalObj.state_id,  count_type: "new-positivePercent"}
    let newNegObj = {state_id: totalObj.state_id, count_type: "new-negativePercent"}
    let tempPosObj = newPositive.find( obj => obj.state_id === totalObj.state_id)
    let tempNegObj = newNegative.find( obj => obj.state_id === totalObj.state_id)
    let tempTotal = newTotal.find( obj => obj.state_id === totalObj.state_id)
    for (let day of allDatesArr) {
      for (let negOrPos of ["Pos"]) {
        if (!eval(`temp${negOrPos}Obj`)[day] || !tempTotal[day]) {
          eval(`new${negOrPos}Obj`)[day] = 0
          } else {
          eval(`new${negOrPos}Obj`)[day] = parseFloat((( eval(`temp${negOrPos}Obj`)[day] * 100) / tempTotal[day]).toFixed(1))
        }
      }
    } // ends FOR OF allDatesArr loop
    newPositivePercentArr.push(newPosObj)
  } // ends FOR OF newTotalArr loop

  // This adds the US percentages to the array    
  let usPosPercentages = {state_id: 99, state_name: "US Totals", count_type: "new-positivePercent"}
    let tempTestsTaken
    let tempPosResults
    console.log("Building US Percentages")
    for (let day of allDatesArr) {
      tempPosResults = newPositive.reduce( 
        function(prev, curr) {
          return prev + curr[day]
        }, 
      0)
      tempTestsTaken = newTotal.reduce( 
        function(prev, curr) {
          return prev + curr[day]
        }, 
      0)
      usPosPercentages[day] = ((tempPosResults * 100)/tempTestsTaken).toFixed(1)
    } // ends FOR OF Loop
    let posPercentWithUS = [...newPositivePercentArr]
    posPercentWithUS.unshift(usPosPercentages)
  return [posPercentWithUS]
} // ends buildPercentageArrays function


export { 
  buildPercentageArrays
}