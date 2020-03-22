import React from 'react'
import GridLinesBuilder from './GridLinesBuilder'
import Table  from 'react-bootstrap/Table'
import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 




function GridBuilder(props) {

  // const variableEditSelectedButtons = (callback) => {
  //   if (props.checkedId === "") {
  //     return <td><button type="button" className="btn btn-sm outline-primary"  disabled  >Edit Selected</button></td>
  //   } else {
  //     return <td><button type="button" className="btn btn-sm btn-primary"   onClick={props.editSelectedGridLine} >Edit Selected</button></td>
  //   }
  // }
  // const variableDeleteSelectedButtons = (callback) => {
  //   if (props.checkedId === "") {
  //     return <td><button type="button" className="btn btn-sm outline-primary" disabled >Delete Selected</button></td>
  //   } else {
  //     return <td><button type="button" className="btn btn-sm btn-primary" onClick={props.deleteSelectedGridLine} >Delete Selected</button></td>

  //   }
  // }

    let GridLines = []
    switch(props.gridType) {
      case "AllStates-PerDay":
        let xAxisDates
        let US_SumsGridline
        if (props.gridLinesArray.length > 0 ) {

            xAxisDates = props.allDatesArr.map(date => <th  key={date} style={{position: "sticky", top: "0"}}>{getMonthDayFromYYYYMMDD(date)} </th> )
            GridLines = props.gridLinesArray.map((gridLineObj, index) => <GridLinesBuilder 
                        key={index} 
                        mappedArrIndex={index} 
                        gridLineObj={gridLineObj} 
                        gridType="AllStates-PerDay"
                        history={props.history}
                        allDatesArr={props.allDatesArr}
                        // checkboxHandler={props.checkboxHandler}
                        // checkedId={props.checkedId}
                      />)

              // This builds the line for US SUMS   
              let US_Totals_Gridline = {state_id: 99}
              for (let day of props.allDatesArr) {
                US_Totals_Gridline[day] = props.gridLinesArray.reduce( 
                  function(prev, curr) {
                    return prev + curr[day]
                  }, 0)
              } // ends FOR OF Loop

      US_SumsGridline = (<GridLinesBuilder 
                        key={99} 
                        gridLineObj={US_Totals_Gridline} 
                        gridType="AllStates-PerDay"
                        history={props.history}
                        allDatesArr={props.allDatesArr}
                        // checkboxHandler={props.checkboxHandler}
                        // checkedId={props.checkedId}
                      />)
          } // ends GridLines IF statement
          return( 
              <Table striped bordered hover responsive id="AllStatesTable" className="table table-fixed" >
                <thead >
                  <tr >
                    <th ></th>
                    {xAxisDates}
                    <th ></th>
                  </tr>
                </thead>
                <tbody>
                  {US_SumsGridline}
                  {GridLines}
                </tbody>
                <tfoot>

                </tfoot>
              </Table>
          ) // ends "AccountDetails-SavedVehicles" RETURN
      default:
        break
    } // ends switch
}  // ends GridBuilder class
export default GridBuilder

