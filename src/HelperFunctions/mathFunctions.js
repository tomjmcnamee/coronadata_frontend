const buildPercentageArrays = (newTotal, newNegative, newPositive, allDatesArr, arrOfMultiSelectedStateIDs) => {
  let newPositivePercentArr = []
  for (let totalObj of newTotal) {
    let newPosObj = {state_id: totalObj.state_id,  count_type: "new-positivePercent"}
    let tempPosObj = newPositive.find( obj => obj.state_id === totalObj.state_id)
    let tempTotal = newTotal.find( obj => obj.state_id === totalObj.state_id)
    for (let day of allDatesArr) {
      if (!tempPosObj[day] || !tempTotal[day]) {
        newPosObj[day] = 0
        } else {
        newPosObj[day] = parseFloat((( tempPosObj[day] * 100) / tempTotal[day]).toFixed(1))
      }
    } // ends FOR OF allDatesArr loop
    newPositivePercentArr.push(newPosObj)
  } // ends FOR OF newTotalArr loop

  
  // let usPosPercentages = {state_id: 99, state_name: "US Totals", count_type: "new-positivePercent"}
  // let tempTestsTaken
  // let tempPosResults
  // console.log("Building US Percentages")
  // for (let day of allDatesArr) {
  //   tempPosResults = newPositive.reduce( 
  //       function(prev, curr) {
  //         return prev + curr[day]
  //       }, 
  //       0)
  //       tempTestsTaken = newTotal.reduce( 
  //         function(prev, curr) {
  //           return prev + curr[day]
  //         }, 
  //     0)
  //     usPosPercentages[day] = ((tempPosResults * 100)/tempTestsTaken).toFixed(1)
  //   } // ends FOR OF Loop
    let posPercentWithUS = [...newPositivePercentArr]
    posPercentWithUS.unshift(aggregateForPosPercentages(allDatesArr, newPositive, newTotal))
    return [posPercentWithUS]
  } // ends buildPercentageArrays function
  
  // This calculates ALL or SELECTED state's data for pos %
const aggregateForPosPercentages = (allDatesArr, newPositive, newTotal, arrOfSelectedStateObjs) => {
  let aggPosPercentagesObj
  if (arrOfSelectedStateObjs) {
    debugger
    let arrOfSelectedStateIDs = arrOfSelectedStateObjs.map(obj => obj.value)
    newPositive = newPositive.filter(({ state_id }) =>  arrOfSelectedStateIDs.includes(state_id))
    newTotal = newTotal.filter(({ state_id }) =>  arrOfSelectedStateIDs.includes(state_id))
    aggPosPercentagesObj = {state_id: 100, state_name: "MultiSelected States", count_type: "new-positivePercent"}
  } else {
    aggPosPercentagesObj = {state_id: 99, state_name: "US Totals", count_type: "new-positivePercent"}
  }
    
  let tempTestsTaken
    let tempPosResults
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
      aggPosPercentagesObj[day] = ((tempPosResults * 100)/tempTestsTaken).toFixed(1)
    } // ends FOR OF Loop
    return aggPosPercentagesObj
} /// ends aggregateForPosPercentages function


export { 
  buildPercentageArrays,
  aggregateForPosPercentages
}