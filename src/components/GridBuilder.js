import React from 'react'
// import Table  from 'react-bootstrap/Table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 



function GridBuilder(props) {

  

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

          xAxisDates = props.allDatesArr.map((date, index) => (

            <Column width={130}  key={index} className="max820">
              <HeaderCell >{getMonthDayFromYYYYMMDD(date)}</HeaderCell>
              <Cell dataKey={date.toString()} />
            </Column>

          ))

          formattedGridLinesArr.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          formattedGridLinesArr.unshift(US_Totals_Gridline)
          
          } // ends GridLines IF statement
          return( 
              <Table 
                data={formattedGridLinesArr}
                rowHeight={30}
                height={275}
              >
                <Column width={90} align="left" fixed >
                  <HeaderCell></HeaderCell>
                  <Cell dataKey="state_name" />
                </Column>
               
                
                {xAxisDates}

                {/* <tbody>
                  {US_SumsGridline}
                  {GridLines}
                </tbody>
                <tfoot>

                </tfoot> */}
              </Table>
          ) // ends "AccountDetails-SavedVehicles" RETURN
      default:
        break
    } // ends switch
}  // ends GridBuilder class
export default GridBuilder

