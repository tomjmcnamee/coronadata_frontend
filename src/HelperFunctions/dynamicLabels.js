import { mapStateIdToStateName } from './mappingIDtoSomething' 
 
 
 const tableDescription = (newOrTotal, selectedStatType, displayType, idOfStateInSingleStateGrid) => {
    let newOrCumulative = () => {
      switch (newOrTotal) {
        case "new": return "Daily"
        case "total": return "Cumulative"
        default: return
      }
    }
    let tableDesc = () => {
      switch (selectedStatType) {
        case "Positive": return "Positive Tests"
        case "Negative": return "Negative Tests"
        case "Death": return "Deaths"
        case "Total": return "Tests Submitted"
        case "Hospitalized": return "Hospitalized"
        default: return
      }
    }
    if (displayType === "table" && selectedStatType === "PositivePercent" ) {
      return 'Percentage of total tests taken that were Positive each day'
    } else if (displayType === "table"){
      return `${newOrCumulative()} count of ${tableDesc()}`
    } else if (displayType === "top10s") {
      if (newOrTotal === "new") {
        return `States with the 10 most ${tableDesc()} reported on last date in range`
      } else {
        return `States with the 10 most total ${tableDesc()} as of last date in range`
      }
    } else if (displayType === "rateOfGrowthChart") {
      if (newOrTotal === "new") {
        return `Rates of Growth for Daily 7-day average numbers from ${mapStateIdToStateName(parseInt(idOfStateInSingleStateGrid))}`
      } else {
        return `Rates of growth of Total 7-day average numbers from ${mapStateIdToStateName(parseInt(idOfStateInSingleStateGrid))}`
      }
    } else if (displayType === "singleStateChart") {
        if (newOrTotal === "new") {
          return `All daily increases for ${mapStateIdToStateName(parseInt(idOfStateInSingleStateGrid))}`
        } else {
          return `All total counts for ${mapStateIdToStateName(parseInt(idOfStateInSingleStateGrid))}`
        }
    }
  }



export { 
  tableDescription
}