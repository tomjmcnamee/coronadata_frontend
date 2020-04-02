import React from 'react'
// import Table  from 'react-bootstrap/Table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 



function GridBuilder(props) {

  

    let formattedGridLinesArr = [...props.gridLinesArray]
    // debugger
    switch(props.gridType) {
      case "AllStates-PerDay":
        let xAxisDates
        
        if (props.gridLinesArray.length > 0 ) {
          
          // This builds the line for US SUMS   for RAW only
            let US_Totals_Gridline = {state_id: 99, state_name: "US Totals"}
            for (let day of props.allDatesArr) {
              US_Totals_Gridline[day] = props.gridLinesArray.reduce( 
                function(prev, curr) {
                  return prev + curr[day]
                }, 0)
              } // ends FOR OF Loop
            formattedGridLinesArr.unshift(US_Totals_Gridline)


          xAxisDates = props.allDatesArr.map((date, index) => (
            index === 0
            ?
              <Column width={80} key={index} sortable >
                <HeaderCell className="headerCell">{getMonthDayFromYYYYMMDD(date)}  </HeaderCell>
                <Cell align="left"  dataKey={date.toString()}  />
              </Column>
            :
              <Column width={80}  key={index} >
                <HeaderCell className="headerCell">{getMonthDayFromYYYYMMDD(date)}</HeaderCell>
                <Cell align="left"  dataKey={date.toString()} />
              </Column>
            
          ))

          formattedGridLinesArr.forEach( obj => !obj.state_name ? obj.state_name = `${mapStateIdToStateName(obj.state_id)}` : null)
          } // ends GridLines IF statement
          return( 
              <Table 
                data={formattedGridLinesArr}
                rowHeight={32}
                height={275}
                onSortColumn={props.sortHandler}
              >
                <Column width={115} align="center"  fixed sortable >
                  <HeaderCell >Sort</HeaderCell>
                  <Cell  dataKey="state_name" />
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

