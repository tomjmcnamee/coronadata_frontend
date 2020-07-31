// import { mapStateIdToStateName } from './mappingIDtoSomething' 
 
 
 const tableDescription = (newOrTotal, selectedStatType, displayType) => {
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
        case "PositivePercent": return "Percentage of Positive Tests"
        default: return
      }
    }
    
    let mostOrHighest = () => {
      switch (selectedStatType) {
        case "Positive": return "most"
        case "Negative": return "most"
        case "Death": return "most"
        case "Total": return "most"
        case "Hospitalized": return "most"
        case "PositivePercent": return "highest"
        default: return
      }
    }

    if (displayType === "table" && selectedStatType === "PositivePercent" ) {
      return 'Percentage of total tests taken that were Positive each day'
    } else if (displayType === "table"){
      return `${newOrCumulative()} count of ${tableDesc()}`
    } else if (displayType === "top10s") {
      if (newOrTotal === "new") {
        return `States with the 10 ${mostOrHighest()} ${tableDesc()} reported on last date in range`
      } else {
        return `States with the 10 most total ${tableDesc()} as of last date in range`
      }
    }
  }



export { 
  tableDescription
}