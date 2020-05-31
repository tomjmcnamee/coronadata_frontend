import React from 'react'
// import Table  from 'react-bootstrap/Table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 



function GridBuilder(props) {

    let xAxisDates
    let formattedGridLinesArr = [...props.gridLinesArray]
    // debugger
    switch(props.gridType) {
      case "AllStates-PerDay":
        
        if (props.gridLinesArray.length > 0 ) {
          
          // This builds the line for US SUMS   for RAW only
            let US_Totals_Gridline = {state_id: 99, state_name: "US Totals"}
            // if statement adds US Totals to dataset IF its not a percentage vierwe
            if (props.selectedStatType != "PositivePercent") {
              for (let day of props.allDatesArr) {
              US_Totals_Gridline[day] = props.gridLinesArray.reduce( 
                function(prev, curr) {
                  return prev + curr[day]
                }, 0)
              }// ends FOR OF Loop
              formattedGridLinesArr.unshift(US_Totals_Gridline)
            }   // Ends IF re: not 'percentage' view


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
                height={375}
                onSortColumn={props.sortHandler}
              >
                <Column width={125} align="center"  fixed sortable >
                  <HeaderCell ></HeaderCell>
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
          ) // 
      case "dataQualityGrades":     
      // let tableData   
        if (props.gridLinesArray.length > 0 ) {
          

      //     tableData = formattedGridLinesArr.map((obj, index) => (
      //         <Column width={80} key={index} sortable >
      //           <HeaderCell className="headerCell">{obj}</HeaderCell>
      //           <Cell align="left"  dataKey={obj.grade}  />
      //         </Column>
            
      //     ))

          formattedGridLinesArr.forEach( obj => !obj.state_name ? obj.state_name = `${mapStateIdToStateName(obj.state_id)}` : null)
          } // ends GridLines IF statement
          return( 
              <Table 
                data={formattedGridLinesArr}
                rowHeight={32}
                height={375}
                onSortColumn={props.sortHandler}
              >
                <Column width={125} align="center"  fixed sortable >
                  <HeaderCell >Sort</HeaderCell>
                  <Cell   dataKey="state_name" />
                </Column>
                <Column width={125} align="center"  fixed sortable >
                  <HeaderCell >Grade</HeaderCell>
                  <Cell   dataKey="grade" />
                </Column>
                {/* <Column width={125} align="center"  fixed sortable >
                  <HeaderCell ></HeaderCell>
                  <Cell   dataKey="moreInfo" />
                </Column> */}
               
                
                {/* {tableData} */}

                {/* <tbody>
                  {US_SumsGridline}
                  {GridLines}
                </tbody>
                <tfoot>

                </tfoot> */}
              </Table>
          ) // 
      default:
        break
    } // ends switch
}  // ends GridBuilder class
export default GridBuilder

