import React from 'react'
// import Table  from 'react-bootstrap/Table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'
import { connect } from 'react-redux'

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { abbreviateLargeNumbers } from '../HelperFunctions/mathFunctions' 
import { mapStateIdToStateName } from '../HelperFunctions/mappingIDtoSomething' 
import {
  jumpToDisplayAndState,
  singleInitialLineChooser

} from '../actions'



  class GridBuilder extends React.Component {

    componentDidMount(){
    }

    


  stateClickHandler = (innerHTML) => {
    this.props.singleInitialLineChooser(this.props.selectedStatType)
    this.props.jumpToDisplayAndState("multiStateChart", innerHTML)
  }

  tableDataToDisplay = () => {
    let outputArr = []
    let lastDate = this.props.staticDatesArr[this.props.staticDatesArr.length - 1]
    if (this.props.columnToSort === "state_name") {

      outputArr = [...this.props[this.props.newOrTotal + this.props.selectedStatType]]
    } else if (this.props.columnToSort === "first_number_col") {
      outputArr = [...this.props[this.props.newOrTotal + this.props.selectedStatType]].sort(function (a, b) { 
        let rtn
        if (a[lastDate] > b[lastDate]) rtn = -1;
        if (a[lastDate] < b[lastDate]) rtn = 1;
        return rtn
      }  )
    }
    return outputArr
    // this.setState({
    //   rawTableData: outputArr
    // }) 
  }

  // setType = () => {
  //   this.setState({
  //     newOrTotal: this.props.newOrTotal,
  //     dataType: this.props.dataType
  //   })
  // }

  render () {

    if (this.props.newDeath.length > 0 ) {

    
    let formattedGridLinesArr = []
    for (let obj of this.tableDataToDisplay()) {
      formattedGridLinesArr.push({...obj})
    }

    let xAxisDates
    if (formattedGridLinesArr.length > 0 ) {
      // This builds the line for US SUMS   for RAW only
      let US_Totals_Gridline = {state_id: 99, state_name: "US Totals"}
      // if statement adds US Totals to dataset IF its not a percentage vierwe
      if (this.props.selectedStatType !== "PositivePercent") {
        for (let day of this.props.allDatesArr) {
        US_Totals_Gridline[day] = formattedGridLinesArr.reduce( 
          function(prev, curr) {
            return prev + curr[day]
          }, 0)
        }// ends FOR OF Loop
        formattedGridLinesArr.unshift(US_Totals_Gridline)
      }   // Ends IF re: not 'percentage' view
      for (let obj of formattedGridLinesArr) {
        for (let num in obj ) {
          if (num.includes(2020) || num.includes(2021)) {
            obj[num] = abbreviateLargeNumbers(obj[num],1)
          }
        }
      }

      xAxisDates = this.props.allDatesArr.map((date, index) => (
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
            onSortColumn={this.props.sortHandler}
          >
            <Column width={125} align="center"  fixed sortable >
              <HeaderCell >Sort</HeaderCell>
              <Cell  style={{cursor: "pointer", color:"blue", textDecoration:"underline"}} onClick={(prop) => this.stateClickHandler(prop.target.innerHTML)} dataKey="state_name" />
            </Column>
            {xAxisDates}
          </Table>
      ) // 
    } else { return <h1>loading</h1>}
  }  ///ends Render
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
    displayType: state.displayType,
    selectedStatType: state.selectedStatType,
    newOrTotal: state.newOrTotal
  }
}

export default connect(msp, mdp)(GridBuilder)


