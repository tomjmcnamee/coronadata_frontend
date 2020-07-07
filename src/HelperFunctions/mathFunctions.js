const buildPercentageArrays = (denominatorArr, numeratorArr, allDatesArr, countType, denomDateDelayInteger) => {
  let outputPercentArr = []
  for (let totalObj of denominatorArr) {
    let newObj = {state_id: totalObj.state_id,  count_type: countType}
    let tempObj = numeratorArr.find( obj => obj.state_id === totalObj.state_id)
    let tempTotal = denominatorArr.find( obj => obj.state_id === totalObj.state_id)
    for (let day of allDatesArr) {
      // if (countType === "new-hospitalizedPercent") {

      //   debugger
      // }
      let dayIndex = allDatesArr.indexOf(day)
      let numeratorDay = day
      let denominatorDay = allDatesArr[dayIndex + denomDateDelayInteger]
      // debugger

      if (!tempObj[numeratorDay] || !tempTotal[denominatorDay] || !denominatorDay) { // this IF ensure neither Num or Denom are undefined
        newObj[day] = 0
      } else {
        newObj[day] = parseFloat((( tempObj[numeratorDay] * 100) / tempTotal[denominatorDay]).toFixed(1))
      }
    } // ends FOR OF allDatesArr loop
    outputPercentArr.push(newObj)

  } // ends FOR OF denominatorArrArr loop

  
  let usPosPercentages = {state_id: 99, state_name: "US Totals", count_type: "new-positivePercent"}
  let tempTestsTaken
  let tempPosResults
  // ("Building US Percentages")
  for (let day of allDatesArr) {
    tempPosResults = numeratorArr.reduce( 
        function(prev, curr) {
          return prev + curr[day]
        }, 
        0)
        tempTestsTaken = denominatorArr.reduce( 
          function(prev, curr) {
            return prev + curr[day]
          }, 
      0)
      usPosPercentages[day] = ((tempPosResults * 100)/tempTestsTaken).toFixed(1)
    } // ends FOR OF Loop
    // debugger 
    let outputPercentArrWithUS = [...outputPercentArr]
    outputPercentArrWithUS.unshift(aggregateForMultiStateChartPercentages(allDatesArr, numeratorArr, denominatorArr))
    // outputPercentArrWithUS.unshift(usPosPercentages)  // THIS WORKS FOR THE GRID PERCENTAGES
    return [outputPercentArrWithUS]
  } // ends buildPercentageArrays function

  
  // This calculates ALL or SELECTED state's data for pos %
const aggregateForMultiStateChartPercentages = (allDatesArr, numeratorArr, denominatorArr, arrOfSelectedStateObjs, countType) => {
  debugger
  let aggPosPercentagesObj
  if (arrOfSelectedStateObjs) {

    let arrOfSelectedStateIDs = arrOfSelectedStateObjs.map(obj => obj.value)
    numeratorArr = numeratorArr.filter(({ state_id }) =>  arrOfSelectedStateIDs.includes(state_id))
    denominatorArr = denominatorArr.filter(({ state_id }) =>  arrOfSelectedStateIDs.includes(state_id))
    aggPosPercentagesObj = {state_id: 100, state_name: "MultiSelected States", count_type: countType}
  } else {
    aggPosPercentagesObj = {state_id: 99, state_name: "US Totals", count_type: countType}
  }


  
  
  let tempNumerator
  let tempDenominator
  let indexCount = (numeratorArr.length - 1)
  let filteredDenominatorArr = []
  for (let day of allDatesArr) {
  
    // This group only counts Positive Results for the states posting a Hospitalized number on the same day
     if (numeratorArr[0].count_type = "new-hospitalized" ) {
       let index = 0
       for ( let stateObj of denominatorArr) {
         if (!numeratorArr[index][day]) {
          // debugger
            filteredDenominatorArr.splice(index,1)
          }
        index++
       }
     } else if (numeratorArr[0].count_type = "new-positive" ) {
      filteredDenominatorArr = denominatorArr
     }
console.log("[DAY] --filteredDenominatorArr ---------- ", day, filteredDenominatorArr  )
    
    tempNumerator = numeratorArr.reduce( 
      function(prev, curr) {
        return prev + curr[day]
      }, 
    0)
    tempDenominator = filteredDenominatorArr.reduce( 
      function(prev, curr) {
        return prev + curr[day]
      }, 0)
    aggPosPercentagesObj[day] = parseFloat(((tempNumerator * 100)/tempDenominator).toFixed(2))
  } // ends FOR OF Loop
  return aggPosPercentagesObj
} /// ends aggregateForMultiStateChartPercentages function


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
    if ( Object.keys(dataSetObj).length > 0 && (dataSetObj.count_type !== "new-positivePercent" && dataSetObj.count_type !== "new-hospitalizedPercent" ) ) {
      sevenDayAverageCalculator(dataSetObj, tempAveragesObj, dates)
    } else if ( Object.keys(dataSetObj).length > 0 && (dataSetObj.count_type === "new-positivePercent" || dataSetObj.count_type === "new-hospitalizedPercent") ) {
      let tempNumeratorArray
      let tempDenominatorArray
      if (dataSetObj.count_type === "new-positivePercent" ) {
        tempNumeratorArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-positive")
        tempDenominatorArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-total")
      } else if (dataSetObj.count_type === "new-hospitalizedPercent" ) {
        tempNumeratorArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-hospitalized")
        tempDenominatorArray = multiStateChartDataSet.find(obj => obj["count_type"] === "new-positive")
      }
      posPercentageSevenDayAverageCalculator(tempDenominatorArray, tempNumeratorArray, tempAveragesObj, dates)
    }
    tempAveragesArr.push(tempAveragesObj)
    multiStateChartDataSet = [ ...multiStateChartDataSet, ...tempAveragesArr]
  } //  Ends for loop for each in the multiStateChartDataSet var array
  return multiStateChartDataSet
} // ends averageCalcultorExtractBuildInject function


const abbreviateLargeNumbers = (value, decimals ) => {
  if (!value) {return null} else {
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



export { 
  buildPercentageArrays,
  aggregateForMultiStateChartPercentages,
  sevenDayAverageCalculator,
  averageCalcultorExtractBuildInject,
  abbreviateLargeNumbers
}