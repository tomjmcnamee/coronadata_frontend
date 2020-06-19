import React from 'react'
// import Table  from 'react-bootstrap/Table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'
import { connect } from 'react-redux'

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 
import {
  jumpToDisplayAndState,
  singleInitialLineChooser

} from '../actions'



function GridBuilder(props) {

  function stateClickHandler(innerHTML){
    props.singleInitialLineChooser(props.selectedStatType)
    props.jumpToDisplayAndState("multiStateChart", innerHTML)
  }

    let formattedGridLinesArr = [...props.gridLinesArray]

    switch(props.gridType) {
      case "AllStates-PerDay":
        let xAxisDates
        
        if (props.gridLinesArray.length > 0 ) {
          
          // This builds the line for US SUMS   for RAW only
            let US_Totals_Gridline = {state_id: 99, state_name: "US Totals"}
            // if statement adds US Totals to dataset IF its not a percentage vierwe
            if (props.selectedStatType !== "PositivePercent") {
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
                  <HeaderCell >Sort</HeaderCell>
                  {/* <Cell  style={{cursor: "pointer", color:"blue", textDecoration:"underline"}} onClick={(prop) => props.jumpToDisplayAndState("singleStateChart", prop.target.innerHTML)} dataKey="state_name" /> */}
                  <Cell  style={{cursor: "pointer", color:"blue", textDecoration:"underline"}} onClick={(prop) => stateClickHandler(prop.target.innerHTML)} dataKey="state_name" />
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
      default:
        break
    } // ends switch
}  // ends GridBuilder class


function mdp(dispatch) {
  return { 
    jumpToDisplayAndState: (displayType, stateName) => dispatch(jumpToDisplayAndState(displayType, stateName)),
    singleInitialLineChooser: (selectedStatType) => dispatch(singleInitialLineChooser(selectedStatType)),

  }
}

// this comes from reduct.js - K is local reference, V is foreign state attribute
function msp(state) {
  return { 
    fromToDatesValue: state.fromToDatesValue,
    allDatesArr: state.allDatesArr,
    staticDatesArr: state.staticDatesArr,
    newPositive: state.newPositive,
    newNegative: state.newNegative,
    newPositivePercent: state.newPositivePercent,
    newDeath: state.newDeath,
    newTotal: state.newTotal,
    newHospitalized: state.newHospitalized,
    totalPositive: state.totalPositive,
    totalNegative: state.totalNegative,
    totalDeath: state.totalDeath,
    totalTotal: state.totalTotal,
    totalHospitalized: state.totalHospitalized,
    stayAtHomeOrders: state.stayAtHomeOrders,
    idOfStateInSingleStateGrid: state.idOfStateInSingleStateGrid,
    displayType: state.displayType,
    selectedStatType: state.selectedStatType,
    newOrTotal: state.newOrTotal
  }
}

export default connect(msp, mdp)(GridBuilder)


