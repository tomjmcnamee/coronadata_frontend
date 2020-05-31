import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab  from 'react-bootstrap/Tab'

import loadingMap from './assets/USSpreadMap.gif'
import fetchingALLdata from './assets/fetchingALLdata.gif'
import { mapStateIdToStateName, mapStateNameToStateId } from './HelperFunctions/mappingIDtoSomething'
import { Button } from 'rsuite';
import './App.css';



class App extends React.Component {
  state = {
    allDatesArr: [],
    staticDatesArr: [],
    newPositive: [],
    newNegative: [],
    newPositivePercent: [],
    // newNegativePercent: [],
    newDeath: [],
    newTotal: [],
    newHospitalized: [],
    totalPositive: [],
    totalNegative: [],
    totalDeath: [],
    totalTotal: [],
    totalHospitalized: [],
    stayAtHomeOrders: [],
    dataQualityGrades: [],

    selectedStatType: "Death",
    newOrTotal: "new",

    displayType: "table",
    idOfStateInSingleStateGrid: "99",
    includeTested: true,
    includeNegatives: true,
    includePositives: true,
    includeHospitalized: true,
    includeDeaths: true,
    includePositivePercent: true,

    columnToSort: "state_name",

    fromToDatesValue: []
  }


  componentDidMount(){

    // document.title = "CoronaVirus Data"        
    this.fetchData("30")


    
  }

  fetchData = ( numberOfDays, fromToDatesValue ) => {
    // variable 'numberOfDays' can hold values "all", or 
    // a string with the number of most recent days you want returned

    //This ensure the 'Loading' screen is presented when fetching
    this.setState({
      totalDeath: []
    })

    let startTime = (+ new Date())
    fetch(process.env.REACT_APP_FETCH_LOCATION + "total_stats", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        FetchPW: process.env.REACT_APP_FETCH_PASSWORD,
        numOfDays: numberOfDays

      }
    })
    .then(resp => resp.json())
    .then((response) => {
      let percentages = this.buildPercentageArrays(response.newTotal, response.newNegative, response.newPositive, response.allDatesArr) 
      // let percentages = [1,2]
      // debugger
      this.setState({
        allDatesArr: response.allDatesArr,
        staticDatesArr: [...response.allDatesArr  ].reverse(),
        totalNegative: response.totalNegative,
        totalDeath: response.totalDeath,
        totalTotal: response.totalTotal,
        totalPositive: response.totalPositive ,
        totalHospitalized: response.totalHospitalized,

        newPositive: response.newPositive,
        newNegative: response.newNegative,
        newDeath: response.newDeath,
        newTotal: response.newTotal,
        newHospitalized: response.newHospitalized,
        
        stayAtHomeOrders: response.stayAtHomeOrders,
        dataQualityGrades: response.dataQualityGrades,

        newPositivePercent: percentages[0],
        fromToDatesValue: fromToDatesValue
      })
      console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
    })        
  }

  buildPercentageArrays = (newTotal, newNegative, newPositive, allDatesArr) => {
    let newPositivePercentArr = []
    for (let totalObj of newTotal) {
      let newPosObj = {state_id: totalObj.state_id,  count_type: "new-positivePercent"}
      let newNegObj = {state_id: totalObj.state_id, count_type: "new-negativePercent"}
      let tempPosObj = newPositive.find( obj => obj.state_id === totalObj.state_id)
      let tempNegObj = newNegative.find( obj => obj.state_id === totalObj.state_id)
      let tempTotal = newTotal.find( obj => obj.state_id === totalObj.state_id)
      for (let day of allDatesArr) {
        for (let negOrPos of ["Pos"]) {
          if (!eval(`temp${negOrPos}Obj`)[day] || !tempTotal[day]) {
            eval(`new${negOrPos}Obj`)[day] = 0
            } else {
            eval(`new${negOrPos}Obj`)[day] = parseFloat((( eval(`temp${negOrPos}Obj`)[day] * 100) / tempTotal[day]).toFixed(1))
          }
        }
      } // ends FOR OF allDatesArr loop
      newPositivePercentArr.push(newPosObj)
    } // ends FOR OF newTotalArr loop

    // This adds the US percentages to the array    
    let usPosPercentages = {state_id: 99, state_name: "US Totals", count_type: "new-positivePercent"}
      let tempTestsTaken
      let tempPosResults
      console.log("Building US Percentages")
      for (let day of allDatesArr) {
        tempPosResults = newPositive.reduce( 
          function(prev, curr) {
            return prev + curr[day]
          }, 
        0)
        tempTestsTaken = newTotal.reduce( 
          function(prev, curr) {
            return prev + curr[day]
          }, 
        0)
        usPosPercentages[day] = ((tempPosResults * 100)/tempTestsTaken).toFixed(1)
      } // ends FOR OF Loop
      let posPercentWithUS = [...newPositivePercentArr]
      posPercentWithUS.unshift(usPosPercentages)
    return [posPercentWithUS]
  } // ends buildPercentageArrays function

  percentageLogicHandler = (event) => {
    // This block resets StatType to Positive WHEN Pos% is active and use clicks TOTAL
    if (this.state.newOrTotal === "new" && this.state.selectedStatType === "PositivePercent" && event && event.target.dataset.buttontype === "newOrTotal" ) {
      this.setState({
        selectedStatType: "Positive",
      })
    }
  }
      
  formChangeHandler = (event) => {
    // debugger
    // This handles the BUTTONS
    if (event.target.dataset.buttontype) {
      this.percentageLogicHandler(event)
      // This IF block changes StatTyp FROM Pos% if 'Totals' button is clicked 
      this.setState({
        [event.target.dataset.buttontype]: event.target.name
      })
    } else if (event.target.dataset.includes) {
      this.setState({
        [event.target.name]: event.target.dataset.includes
      })
    } else {
      // This handles the Dropdowns
      this.percentageLogicHandler(event)
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  formToggleHandler = (event) => {
    let newVal = !this.state[event.target.name]
    this.setState({
      [event.target.name]: newVal
    })
  }

  dropdownOptionsForStates = () => {
    let output = []
    for (let id = 1; id < 52; id++) {
      // Runs 5 times, with values of step 0 through 4.
      output.push(<option key={id} value={id}>{mapStateIdToStateName(parseInt(id))}</option>);
    }
    output.push(<option key={53} value={53}>Puerto Rico</option>);
<<<<<<< HEAD

=======
>>>>>>> master
    return output
  }

  singleStateData = () => {
    let output = []
    let count_types = []
    let state_type = []
    if (this.state.idOfStateInSingleStateGrid == "99") {
      // debugger
      /////This does all the calucaitons APP side and 1 Obj PER DAY to be passed directly to the Chart
        count_types = [this.state.newOrTotal + "-total",this.state.newOrTotal + "-positive",this.state.newOrTotal + "-negative",this.state.newOrTotal + "-death",this.state.newOrTotal + "-hospitalized"]
        state_type =  [this.state.newOrTotal + "Total",this.state.newOrTotal + "Positive",this.state.newOrTotal + "Negative",this.state.newOrTotal + "Death",this.state.newOrTotal + "Hospitalized"]
        // let chartColumnName = [ "Tested", "Positive", "Negative", "Deaths"]
      // for (let day of this.state.staticDatesArr) { 
        // debugger
        let index = 0
        let tempObj
        for (let countT of count_types) {
          tempObj = {state_id: 99, "count_type": countT}
          for (let day of this.state.staticDatesArr) {
            tempObj[day] = this.state[state_type[index]].reduce(
              function(prev, curr) {
                return prev + curr[day]
              }, 0)
            }
          index++
          output.push(tempObj)
        }
        output.push(this.state[this.state.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === 99))
        //     tempObj[chartColumnName[index]] = this.state[state_type[index]].reduce( 
          //               function(prev, curr) {
      //                 // debugger
      //                 return prev + curr[day]
      //               }, 0)
      //     index++
      //   }
      //   output.push(tempObj)
    } else {
      output.push(this.state[this.state.newOrTotal + "Death"].find((obj) => obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)  ))
      output.push(this.state[this.state.newOrTotal + "Total"].find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      output.push(this.state[this.state.newOrTotal + "Positive"].find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      output.push(this.state[this.state.newOrTotal + "Negative"].find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      output.push(this.state[this.state.newOrTotal + "Hospitalized"].find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      output.push(this.state[this.state.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
    }
    return output
  }
  
  
  
  
  sortHandler = (columnToSortValue) => {
    if (columnToSortValue === "state_name") {
      this.setState({
        columnToSort: "state_name"
      })
    } else {
      this.setState({
        columnToSort: "first_number_col"
      })
    }
  }

  jumpToDisplayAndState = (displayType, stateName) => {
    this.setState({
      idOfStateInSingleStateGrid: mapStateNameToStateId(stateName),
      displayType: displayType
    })

  }
  
  
  render() {
    const tableDataToDisplay = () => {
      let outputArr
      let lastDate = this.state.staticDatesArr[this.state.staticDatesArr.length - 1]
      if (this.state.columnToSort === "state_name") {
        outputArr = [...this.state[this.state.newOrTotal + this.state.selectedStatType]]
        // debugger
      } else if (this.state.columnToSort === "first_number_col") {
        // debugger
        // outputArr = this.state[this.state.newOrTotal + this.state.selectedStatType].sort((a, b) => a.lastDate-b.lastDate )
        outputArr = [...this.state[this.state.newOrTotal + this.state.selectedStatType]].sort(function (a, b) { 
          if (a[lastDate] > b[lastDate]) return -1;
	        if (a[lastDate] < b[lastDate]) return 1;
        }  )
      }
      return outputArr
    }
    
    const top10sData = () => {
      // debugger
      let output = []
      let lastDate = this.state.staticDatesArr[this.state.staticDatesArr.length - 1]
  
      let sortedObjects = [...this.state[this.state.newOrTotal + this.state.selectedStatType]].sort(function (a, b) { 
        if (a[lastDate] > b[lastDate]) return -1;
        if (a[lastDate] < b[lastDate]) return 1;
      }  )
      let top10StateIDs = sortedObjects.slice(0,10).map(obj => obj.state_id)
      for (let id of top10StateIDs) {
        output.push(this.state[this.state.newOrTotal + this.state.selectedStatType].find((obj) => obj.state_id === id  ))
      }
      return output
    }


    let tableDescription = () => {
      let newOrCumulative = () => {
        switch (this.state.newOrTotal) {
          case "new": return "Daily"
          case "total": return "Cumulative"
          default: return
        }
      }
      let tableDesc = () => {
        switch (this.state.selectedStatType) {
          case "Positive": return "Positive Tests"
          case "Negative": return "Negative Tests"
          case "Death": return "Deaths"
          case "Total": return "Tests Submitted"
          case "Hospitalized": return "Hospitalized"
          default: return
        }
      }
      if (this.state.displayType === "table"){
        return `${newOrCumulative()} count of ${tableDesc()}`
      } else if (this.state.displayType === "top10s") {
        if (this.state.newOrTotal === "new") {
          return `States with the 10 most ${tableDesc()} reported on last date in range`
        } else {
          return `States with the 10 most total ${tableDesc()} as of last date in range`
        }
      } else if (this.state.displayType === "rateOfGrowthChart") {
        if (this.state.newOrTotal === "new") {
          return `Rates of Growth for Daily 7-day average numbers from ${mapStateIdToStateName(parseInt(this.state.idOfStateInSingleStateGrid))}`
        } else {
          return `Rates of growth of Total 7-day average numbers from ${mapStateIdToStateName(parseInt(this.state.idOfStateInSingleStateGrid))}`
        }
      } else {
          if (this.state.newOrTotal === "new") {
            return `All daily increases for ${mapStateIdToStateName(parseInt(this.state.idOfStateInSingleStateGrid))}`
          } else {
            return `All total counts for ${mapStateIdToStateName(parseInt(this.state.idOfStateInSingleStateGrid))}`
          }
      }
    }

    


    return (
      
      <div className="App">
        <Container>
          <Row > 
            <Col sm={12} >
              <h3>Coronavirus in the US: by the numbers</h3>
            </Col>
          </Row>
          <Row>
            <Form >
              <Form.Row>
                <Form.Group  >
                  
                {this.state.displayType === "table"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="table" active >
                      Raw Numbers<br />Tables
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="table"  onClick={this.formChangeHandler}>
                      Raw Numbers<br />Tables
                    </Button>
                  }
                  {this.state.displayType === "singleStateChart"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="singleStateChart" active >
                      Single State<br />(and U.S.) Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="singleStateChart"  onClick={this.formChangeHandler}>
                      Single State<br />(and U.S.) Charts 
                    </Button>
                  }  
                  </Form.Group  >          
                </Form.Row>
                <Form.Row>
                  <Form.Group  >
                  {this.state.displayType === "top10s"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="top10s" active >
                      Top 10<br />Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="top10s"  onClick={this.formChangeHandler}>
                      Top 10<br />Charts
                    </Button>
                  }
                  {this.state.displayType === "rateOfGrowthChart"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="rateOfGrowthChart" active >
                      Rates of<br />Growth Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="rateOfGrowthChart"  onClick={this.formChangeHandler}>
                      Rates of<br />Growth Charts
                    </Button>
                  }
                  {this.state.displayType === "dataQualityGrades"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="dataQualityGrades" active >
                      Data Quality<br />Grades
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="dataQualityGrades"  onClick={this.formChangeHandler}>
                      Data Quality<br />Grades
                    </Button>
                  }
                </Form.Group  >
              </Form.Row>
            </Form >
          </Row>
          <Row>
            <Col  sm={3}>
              <Form >
                <Form.Row>
                  <Form.Group  >
                    {(this.state.displayType === "table" || this.state.displayType === "top10s")
                    ?
                      <Form.Control as="select" name="selectedStatType" value={this.state.selectedStatType} onChange={this.formChangeHandler} > 
                        <option value="Positive">Test Results: Positive</option>
                        {this.state.newOrTotal === "new" ? <option value="PositivePercent">Positive Results Percentage</option> : null }
                        <option value="Negative">Test Results: Negative</option>
                        {/* {this.state.newOrTotal === "new" ? <option value="NegativePercent">Negative Results Percentage</option> : null } */}
                        <option value="Total">Total Tested</option>
                        <option value="Hospitalized">Total Hospitalized</option>
                        <option value="Death">Corona Deaths</option>
                      </Form.Control>
                    :
                    null
                    }
                  </Form.Group  >
                </Form.Row>
              </Form>
              
            </Col>
          </Row>
          <Row>
            <Col className="justify-content-center" sm={3}>
              <Form >
                <Form.Row>
                  <Form.Group  >
                    {this.state.newOrTotal === "new"
                    ?
                      <Button className="typebutton" data-buttontype="newOrTotal" appearance="primary" size="md" name="new" active>
                        New Per Day
                      </Button>
                    :
                      <Button className="typebutton" data-buttontype="newOrTotal" appearance="ghost" size="md" name="new"  onClick={this.formChangeHandler}>
                        New Per Day
                      </Button>
                    }
                    {this.state.newOrTotal === "total"
                    ?
                      <Button className="typebutton"  data-buttontype="newOrTotal" appearance="primary" size="md" name="total" active >
                        Total
                    </Button>
                    :
                      <Button className="typebutton"  data-buttontype="newOrTotal" appearance="ghost" size="md" name="total"  onClick={this.formChangeHandler}>
                        Total
                    </Button>
                    }
                  </Form.Group  >
                  {/* <Form.Group  > */}
                  {/* </Form.Group  > */}
                </Form.Row>
              </Form>
            </Col>
          </Row>
          {this.state.displayType === "singleStateChart" || this.state.displayType === "rateOfGrowthChart"
          ?
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                      <Form.Control as="select" name="idOfStateInSingleStateGrid" value={this.state.idOfStateInSingleStateGrid} onChange={this.formChangeHandler} > 
                      <option value={99}>Entire U.S.</option>
                        {this.dropdownOptionsForStates()}
                      </Form.Control>
                  </Form.Group  >
                </Form.Row>
              </Form>
          </Row>  
          :
          null
          }
          {this.state.displayType === "singleStateChart" || this.state.displayType === "rateOfGrowthChart"
          ?
          // <Row>
          //   <Form >
          //           <Form.Check  inline type="checkbox" name="includeTested" checked={this.state.includeTested} label="'Total Tested'" onChange={this.formToggleHandler}/>
          //           <Form.Check inline type="checkbox" name="includePositives" checked={this.state.includePositives} label="'Positive Results'" onChange={this.formToggleHandler}/>
          //       <Form.Row>
          //         <Form.Group  >
          //           <Form.Check inline type="checkbox" name="includeNegatives" checked={this.state.includeNegatives} label="'Negative Results'" onChange={this.formToggleHandler}/>
          //           <Form.Check inline type="checkbox" name="includeHospitalized" checked={this.state.includeHospitalized} label="'Hospitalized'" onChange={this.formToggleHandler}/>
          //           <Form.Check inline type="checkbox" name="includeDeaths" checked={this.state.includeDeaths} label="'Deaths'" onChange={this.formToggleHandler}/>
          //         </Form.Group  >
          //       </Form.Row>
          //     </Form>
          // </Row>  
          <Row>
              {this.state.includeTested
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeTested" onClick={this.formToggleHandler} active >
                  Total Tested
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeTested"  onClick={this.formToggleHandler}>
                  Total Tested
                </Button>
              }
              {this.state.includeNegatives
              ?
              <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeNegatives" onClick={this.formToggleHandler} active >
                  Negative Results
                </Button>
              :
              <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeNegatives"  onClick={this.formToggleHandler}>
                  Negative Results
                </Button>
              }
              {this.state.includePositives
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includePositives" onClick={this.formToggleHandler} active >
                  Positive Results
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includePositives"  onClick={this.formToggleHandler}>
                  Positive Results
                </Button>
              }
              { this.state.newOrTotal === "total" 
              ?
                null  // this hides the option to show Pos% on line graph if viewing TOTAL (instead of NEW)
              :
              this.state.includePositivePercent
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includePositivePercent" onClick={this.formToggleHandler} active >
                  Positive Percentage
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includePositivePercent"  onClick={this.formToggleHandler}>
                  Positive Percentage
                </Button>
              }
              {this.state.includeHospitalized
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeHospitalized" onClick={this.formToggleHandler} active >
                  Hospitalized
              </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeHospitalized"  onClick={this.formToggleHandler}>
                  Hospitalized
              </Button>
              }
              {this.state.includeDeaths
              ?
                <Button className="typebutton"   color="green" appearance="primary" size="sm" name="includeDeaths" onClick={this.formToggleHandler} active >
                  Deaths
              </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeDeaths"  onClick={this.formToggleHandler}>
                  Deaths
              </Button>
              }
          </Row>  
          :
          null
          }
          <Row>
            <Col sm={12} >
              <h5>{this.state.totalDeath.length > 0 ? tableDescription() : null }</h5>
            </Col>
          </Row>
          <Row  className="justify-content-md-center" >
            <Col md="auto" >
                {this.state.totalDeath.length > 0
                ?  
                  this.state.displayType === "table"
                  ?
                  <div id="statesTable" >
                    <GridBuilder
                      gridType="AllStates-PerDay"
                      allDatesArr={this.state.allDatesArr}
                      gridLinesArray={tableDataToDisplay()}
                      // gridLinesArray={this.state[this.state.newOrTotal + this.state.selectedStatType]} //ex: newDeath or totalPositive
                      selectedStatType={this.state.selectedStatType} //ex: Pos, Neg, Total, Death
                      sortHandler={this.sortHandler}
                      jumpToDisplayAndState={this.jumpToDisplayAndState}
                    />
                  </div>
                  :

                  this.state.displayType === "dataQualityGrades"
                  ?
                  <div id="statesTable" >
                    <GridBuilder
                      gridType="dataQualityGrades"
                      gridLinesArray={this.state.dataQualityGrades}
                      // gridLinesArray={this.state[this.state.newOrTotal + this.state.selectedStatType]} //ex: newDeath or totalPositive
                      sortHandler={this.sortHandler}
                    />
                  </div>
                  :


                  (this.state.displayType === "singleStateChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="singleStateChart"
                                          allDatesArr={this.state.staticDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.state.selectedStatType}
                                          includeTested={this.state.includeTested}
                                          includeNegatives={this.state.includeNegatives}
                                          includeDeaths={this.state.includeDeaths}
                                          includePositives={this.state.includePositives}
                                          includePositivePercent={this.state.includePositivePercent}
                                          includeHospitalized={this.state.includeHospitalized}
                                          stayAtHomeOrders={this.state.stayAtHomeOrders.filter(obj => obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid) )}
                                          fetchData={this.fetchData}
                                          fromToDatesValue={this.state.fromToDatesValue}  //This is needed to display the correct dates and data after a 'get all data' fetch
                    />
                    // </div>
                  :
                  (this.state.displayType === "top10s")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="top10s"
                                          allDatesArr={
                                            this.state.selectedStatType === "Hospitalized" 
                                            ?
                                              this.state.staticDatesArr.slice(16,-1)
                                              :
                                              this.state.staticDatesArr
                                          }
                                          gridLinesArray={top10sData()}
                                          selectedStatType={this.state.selectedStatType}
                                          newOrTotal={this.state.newOrTotal}
                                          includeTested={this.state.includeTested}
                                          includeNegatives={this.state.includeNegatives}
                                          includeDeaths={this.state.includeDeaths}
                                          includePositives={this.state.includePositives}
                                          includeHospitalized={this.state.includeHospitalized}
                    />
                    // </div>
                  :
                  // null
                  (this.state.displayType === "rateOfGrowthChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="rateOfGrowthChart"
                                          allDatesArr={this.state.staticDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.state.selectedStatType}
                                          newOrTotal={this.state.newOrTotal}
                                          includeTested={this.state.includeTested}
                                          includeNegatives={this.state.includeNegatives}
                                          includeDeaths={this.state.includeDeaths}
                                          includePositives={this.state.includePositives}
                                          includeHospitalized={this.state.includeHospitalized}
                    />
                    // </div>
                  :
                  null
                :
                  this.state.newDeath.length === 0 
                  ?
                  <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                  :
                  <img src={fetchingALLdata} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                }
              </Col>
          </Row>
        </Container>
        <p>Updated once daily ~5:30pm Eastern. Data pulled from <a target="_blank" href="https://covidtracking.com/" rel="noopener noreferrer" >CovidTracking.com</a> (for more info, see <a target="_blank" href="https://talkingpointsmemo.com/edblog/key-source-of-covid-19-testing-infection-data"  rel="noopener noreferrer" >this article</a>).</p>
        {process.env.REACT_APP_VIEW_TRACKER === "true"
        ?
          <>
            <a  style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://hitwebcounter.com/counter/counter.php?page=7213589&style=0005&nbdigits=6&type=page&initCount=0" title="User Stats" alt="PHP Hits Count"   border="0" />
            </a>                
            <a style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://hitwebcounter.com/counter/counter.php?page=7213591&style=0005&nbdigits=6&type=ip&initCount=0" title="User Stats" alt="PHP Hits Count"   border="0" />              
            </a>
          </> 
        : null}
      </div>
    ) //ends return
  } // ends render
}  // ends App Class


export default App
