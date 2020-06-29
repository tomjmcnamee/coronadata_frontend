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
  // ("Building US Percentages")
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
      aggPosPercentagesObj[day] = parseFloat(((tempPosResults * 100)/tempTestsTaken).toFixed(2))
    } // ends FOR OF Loop
    return aggPosPercentagesObj
} /// ends aggregateForPosPercentages function


const sevenDayAverageCalculator = (inputObj, outputObj, datesArr) => {
  let i = 6
  while (i < datesArr.length) {
    outputObj[datesArr[i]] = Math.trunc((inputObj[datesArr[i]] + (inputObj[datesArr[i-1]]) + (inputObj[datesArr[i-2]]) + (inputObj[datesArr[i-3]]) + (inputObj[datesArr[i-4]]) + 
    (inputObj[datesArr[i-5]]) + (inputObj[datesArr[i-6]]))/7)
    i++
  }
}

const posPercentageSevenDayAverageCalculator = (totalArr, posArr, outputObj, datesArr) => {
  let i = 6
  while (i < datesArr.length) {
    outputObj[datesArr[i]] = parseFloat(Math.trunc((posArr[datesArr[i]] + (posArr[datesArr[i-1]]) + (posArr[datesArr[i-2]]) + (posArr[datesArr[i-3]]) + (posArr[datesArr[i-4]]) + 
    (posArr[datesArr[i-5]]) + (posArr[datesArr[i-6]]))/7)/((totalArr[datesArr[i]] + (totalArr[datesArr[i-1]]) + (totalArr[datesArr[i-2]]) + (totalArr[datesArr[i-3]]) + (totalArr[datesArr[i-4]]) + 
    (totalArr[datesArr[i-5]]) + (totalArr[datesArr[i-6]]))/7)*100).toFixed(2) 
    i++
  }
}

const averageCalcultorExtractBuildInject = (multiStateChartDataSet) => {  
  for (let dataSetObj of multiStateChartDataSet) {
    
    let tempAveragesArr = []
    let tempAveragesObj = {}
    let dates = Object.keys(dataSetObj).filter( k => k.startsWith("202"))
    let tempCountType = dataSetObj["count_type"]
    tempAveragesObj["count_type"] = tempCountType + "-avg"
    if ( Object.keys(dataSetObj).length > 0 && dataSetObj.count_type !== "new-positivePercent") {
      sevenDayAverageCalculator(dataSetObj, tempAveragesObj, dates)
    } else if ( Object.keys(dataSetObj).length > 0 && dataSetObj.count_type === "new-positivePercent") {
      let tempTotalTestsArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-total")
      let tempPosTestsArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-positive")
      posPercentageSevenDayAverageCalculator(tempTotalTestsArray, tempPosTestsArray, tempAveragesObj, dates)
    }
    tempAveragesArr.push(tempAveragesObj)
    multiStateChartDataSet = [ ...multiStateChartDataSet, ...tempAveragesArr]
  } //  Ends for loop for each in the multiStateChartDataSet var array
  return multiStateChartDataSet
} // ends averageCalcultorExtractBuildInject function


const abbreviateLargeNumbers = (value, decimals ) => {
  if (!value) {return 0} else {
    let stringVal = value.toString() || "0"
    let length = stringVal.length
    if (length > 5) {
      let newValue = value || 0;
      const suffixes = ["", "K", "M", "B","T"];
      let suffixNum = 0;
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }

      if (parseFloat(newValue) && decimals ) {
        if (suffixNum === 1) {newValue = newValue.toFixed(1)}
        else if (suffixNum >= 2 ) {newValue = newValue.toFixed(2)}
      }
      newValue += suffixes[suffixNum];
      return newValue;
    } else return numberWithCommas(value)
  }  // ends IF re: a null value
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function numberStringWithCommas(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export { 
  buildPercentageArrays,
  aggregateForPosPercentages,
  sevenDayAverageCalculator,
  averageCalcultorExtractBuildInject,
  abbreviateLargeNumbers
}