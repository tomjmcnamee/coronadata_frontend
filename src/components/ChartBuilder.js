import React from 'react'
// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 



function ChartBuilder(props) {

  

    let formattedGridLinesArr = [...props.gridLinesArray]
    switch(props.gridType) {
      case "AllStates-PerDay":
        let xAxisDates
        
        if (props.gridLinesArray.length > 0 ) {

          // This builds the line for US SUMS   
          let US_Totals_Gridline = {state_id: 99, state_name: "US Totals"}
          for (let day of props.allDatesArr) {
            US_Totals_Gridline[day] = props.gridLinesArray.reduce( 
              function(prev, curr) {
                return prev + curr[day]
              }, 0)
          } // ends FOR OF Loop

          // xAxisDates = props.allDatesArr.map((date, index) => (

          //   <Column width={80} key={index}>
          //     <HeaderCell className="headerCell">{getMonthDayFromYYYYMMDD(date)}</HeaderCell>
          //     <Cell dataKey={date.toString()} />
          //   </Column>

          // ))

          formattedGridLinesArr.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          formattedGridLinesArr.unshift(US_Totals_Gridline)
          
          } // ends GridLines IF statement
          return( 
              <h1>hi</h1>
          ) // ends "AccountDetails-SavedVehicles" RETURN
      default:
        break
    } // ends switch
}  // ends ChartBuilder class
export default ChartBuilder

