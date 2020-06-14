import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab  from 'react-bootstrap/Tab'

import loadingMap from './assets/USSpreadMap.gif'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import fetchingALLdata from './assets/fetchingALLdata.gif'
import { mapStateIdToStateName, mapStateNameToStateId } from './HelperFunctions/mappingIDtoSomething'
import { tableDescription } from './HelperFunctions/dynamicLabels'
import { Button } from 'rsuite';
import './App.css';
import { 
    fetchAllStatesData,
    jumpToDisplayAndState,
    setSelectedStatType,
    setNewOrTotal,
    setDisplayType,
    setIdOfStateInSingleStateGrid,
    toggleGridlines,
    singleInitialLineChooser
        } from './actions'



class App extends React.Component {
  state = {
    // allDatesArr: [],     //in reducer
    // staticDatesArr: [],   //in reducer
    newPositive: [],   //in reducer
    newNegative: [],   //in reducer
    newPositivePercent: [],   //in reducer
    newDeath: [],   //in reducer
    newTotal: [],   //in reducer
    newHospitalized: [],   //in reducer
    totalPositive: [],   //in reducer
    totalNegative: [],   //in reducer
    totalDeath: [],   //in reducer
    totalTotal: [],   //in reducer
    totalHospitalized: [],   //in reducer

    // selectedStatType: "Death",  //in reducer
    // newOrTotal: "new",//in reducer

    // displayType: "table",  //in reducer
    // idOfStateInSingleStateGrid: "99",    //in reducer


    columnToSort: "state_name",

    fromToDatesValue: [] //in reducer
  }


  componentDidMount(){

    // document.title = "CoronaVirus Data"        
    this.fetchData("30")
    
  }
  
  fetchData = ( numberOfDays, fromToDatesValue ) => {
    this.props.fetchAllStatesData( numberOfDays, fromToDatesValue )
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
        // allDatesArr: response.allDatesArr,
        // staticDatesArr: [...response.allDatesArr  ].reverse(),
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
        newPositivePercent: percentages[0],
        fromToDatesValue: fromToDatesValue
      })
      console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
    })        
  }

  ////CAN DELETE
  buildPercentageArrays = (newTotal, newNegative, newPositive, allDatesArr) => {
    let newPositivePercentArr = []
    for (let totalObj of newTotal) {
      let newPosObj = {state_id: totalObj.state_id,  count_type: "new-positivePercent"}
      let newNegObj = {state_id: totalObj.state_id, count_type: "new-negativePercent"}
      let tempPosObj = newPositive.find( obj => obj.state_id === totalObj.state_id)
      let tempNegObj = newNegative.find( obj => obj.state_id === totalObj.state_id)
      let tempTotal = newTotal.find( obj => obj.state_id === totalObj.state_id)
      for (let day of allDatesArr) {
        if (!tempPosObj[day] || !tempTotal[day]) {
          newPosObj[day] = 0
          } else {
          newPosObj[day] = parseFloat((( tempPosObj[day] * 100) / tempTotal[day]).toFixed(1))
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
    if (this.props.newOrTotal === "new" && this.props.selectedStatType === "PositivePercent" && event && event.target.dataset.buttontype === "newOrTotal" ) {
        this.props.setSelectedStatType("Positive")
    }
  }
   
  formChangeHandler = (event) => {
    // debugger
    // This handles the BUTTONS
    if (event.target.dataset.buttontype) {
      // this if statement adds the t.s.selectedStatType line when opening 'Single Single State Chart' line graph
      if (event.target.name === "singleStateChart") {
        this.props.singleInitialLineChooser(this.props.selectedStatType)
      }
      
      this.percentageLogicHandler(event)
      // This IF block changes StatTyp FROM Pos% if 'Totals' button is clicked 
      if (event.target.dataset.buttontype === "newOrTotal") this.props.setNewOrTotal(event.target.name)
      if (event.target.dataset.buttontype === "displayType") this.props.setDisplayType(event.target.name)
      
      // TO DELETE - In ACTIONS
      // this.setState({
      //   [event.target.dataset.buttontype]: event.target.name
      // })
      
      
      
      //This handles the "Include in Graph" buttonns
    } else if (event.target.dataset.includes) {
      // this.setState({
      //   [event.target.name]: event.target.dataset.includes
      // })
    } else {
      // This handles the Dropdowns
      this.percentageLogicHandler(event)
      if (event.target.name === "selectedStatType") this.props.setSelectedStatType(event.target.value)
      if (event.target.name === "idOfStateInSingleStateGrid") this.props.setIdOfStateInSingleStateGrid(event.target.value)
      // this.setState({
      //   [event.target.name]: event.target.value
      // })
    }
  }

  formToggleHandler = (event) => {
    let newVal = !this.props.includeGridLines[event.target.name]
    this.props.toggleGridlines(event.target.name, newVal)
    // this.setState({
    //   [event.target.name]: newVal
    // })
  }

  dropdownOptionsForStates = () => {
    let output = []
    for (let id = 1; id < 52; id++) {
      // Runs 5 times, with values of step 0 through 4.
      output.push(<option key={id} value={id}>{mapStateIdToStateName(parseInt(id))}</option>);
    }
    output.push(<option key={53} value={53}>Puerto Rico</option>);
    return output
  }


  
  singleStateData = () => {
    let output = []
    let count_types = []
    let state_type = []


    //This IF builds all 'Etire US' data sets to send along
    if (this.props.idOfStateInSingleStateGrid == "99") {
      // debugger
      /////This does all the calucaitons APP side and 1 Obj PER DAY to be passed directly to the Chart
        count_types = [this.props.newOrTotal + "-total",this.props.newOrTotal + "-positive",this.props.newOrTotal + "-negative",this.props.newOrTotal + "-death",this.props.newOrTotal + "-hospitalized"]
        state_type =  [this.props.newOrTotal + "Total",this.props.newOrTotal + "Positive",this.props.newOrTotal + "Negative",this.props.newOrTotal + "Death",this.props.newOrTotal + "Hospitalized"]
        // let chartColumnName = [ "Tested", "Positive", "Negative", "Deaths"]
      // for (let day of this.props.staticDatesArr) { 
        // debugger
        let index = 0
        let tempObj
        for (let countT of count_types) {
          tempObj = {state_id: 99, "count_type": countT}
          for (let day of this.props.staticDatesArr) {
            tempObj[day] = this.state[state_type[index]].reduce(
              function(prev, curr) {
                return prev + curr[day]
              }, 0)
            }
          index++
          output.push(tempObj)
        }
        //This next if statement doesn't send Postive% data to grid if t.s.newOrTotal = total
        if (this.props.newOrTotal === "new") {
          output.push(this.state[this.props.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === 99))
        }
        //     tempObj[chartColumnName[index]] = this.state[state_type[index]].reduce( 
          //               function(prev, curr) {
      //                 // debugger
      //                 return prev + curr[day]
      //               }, 0)
      //     index++
      //   }
      //   output.push(tempObj)
    } else {
      output.push(this.state[this.props.newOrTotal + "Death"].find((obj) => obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)  ))
      output.push(this.state[this.props.newOrTotal + "Total"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.state[this.props.newOrTotal + "Positive"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.state[this.props.newOrTotal + "Negative"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.state[this.props.newOrTotal + "Hospitalized"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      if (this.props.newOrTotal === "new") {
        output.push(this.state[this.props.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      }
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


  
  
  render() {
    const tableDataToDisplay = () => {
      let outputArr
      let lastDate = this.props.staticDatesArr[this.props.staticDatesArr.length - 1]
      

      
      if (this.state.columnToSort === "state_name") {
        outputArr = [...this.state[this.props.newOrTotal + this.props.selectedStatType]]
        // debugger
      } else if (this.state.columnToSort === "first_number_col") {
        // debugger
        // outputArr = this.state[this.props.newOrTotal + this.props.selectedStatType].sort((a, b) => a.lastDate-b.lastDate )
        outputArr = [...this.state[this.state.newOrTotal + this.props.selectedStatType]].sort(function (a, b) { 
          if (a[lastDate] > b[lastDate]) return -1;
	        if (a[lastDate] < b[lastDate]) return 1;
        }  )
      }
      return outputArr
    }
    
    const top10sData = () => {
      // debugger
      let output = []
      let lastDate = this.props.staticDatesArr[this.props.staticDatesArr.length - 1]
  
      let sortedObjects = [...this.state[this.props.newOrTotal + this.props.selectedStatType]].sort(function (a, b) { 
        if (a[lastDate] > b[lastDate]) return -1;
        if (a[lastDate] < b[lastDate]) return 1;
      }  )
      let top10StateIDs = sortedObjects.slice(0,10).map(obj => obj.state_id)
      for (let id of top10StateIDs) {
        output.push(this.state[this.props.newOrTotal + this.props.selectedStatType].find((obj) => obj.state_id === id  ))
      }
      return output
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
                  
                {this.props.displayType === "table"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="table" active >
                      Raw Numbers<br />Tables
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="table"  onClick={this.formChangeHandler}>
                      Raw Numbers<br />Tables
                    </Button>
                  }
                  {this.props.displayType === "singleStateChart"
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
                  {this.props.displayType === "top10s"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="top10s" active >
                      Top 10<br />Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="top10s"  onClick={this.formChangeHandler}>
                      Top 10<br />Charts
                    </Button>
                  }
                  {this.props.displayType === "rateOfGrowthChart"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="rateOfGrowthChart" active >
                      Rates of<br />Growth Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="rateOfGrowthChart"  onClick={this.formChangeHandler}>
                      Rates of<br />Growth Chart
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
                    {(this.props.displayType === "table" || this.props.displayType === "top10s")
                    ?
                      <Form.Control as="select" name="selectedStatType" value={this.props.selectedStatType} onChange={this.formChangeHandler} > 
                        <option value="Positive">Test Results: Positive</option>
                        {this.props.newOrTotal === "new" ? <option value="PositivePercent">Positive Results Percentage</option> : null }
                        <option value="Negative">Test Results: Negative</option>
                        {/* {this.props.newOrTotal === "new" ? <option value="NegativePercent">Negative Results Percentage</option> : null } */}
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
                    {this.props.newOrTotal === "new"
                    ?
                      <Button className="typebutton" data-buttontype="newOrTotal" appearance="primary" size="md" name="new" active>
                        New Per Day
                      </Button>
                    :
                      <Button className="typebutton" data-buttontype="newOrTotal" appearance="ghost" size="md" name="new"  onClick={this.formChangeHandler}>
                        New Per Day
                      </Button>
                    }
                    {this.props.newOrTotal === "total"
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
          {this.props.displayType === "singleStateChart" || this.props.displayType === "rateOfGrowthChart"
          ?
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                      <Form.Control as="select" name="idOfStateInSingleStateGrid" value={this.props.idOfStateInSingleStateGrid} onChange={this.formChangeHandler} > 
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
          {this.props.displayType === "singleStateChart" || this.props.displayType === "rateOfGrowthChart"
          ? 
          <Row>
              {this.props.includeGridLines.includeTested
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeTested" onClick={this.formToggleHandler} active >
                  Total Tested
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeTested"  onClick={this.formToggleHandler}>
                  Total Tested
                </Button>
              }
              {this.props.includeGridLines.includeNegatives
              ?
              <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeNegatives" onClick={this.formToggleHandler} active >
                  Negative Results
                </Button>
              :
              <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeNegatives"  onClick={this.formToggleHandler}>
                  Negative Results
                </Button>
              }
              {this.props.includeGridLines.includePositives
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includePositives" onClick={this.formToggleHandler} active >
                  Positive Results
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includePositives"  onClick={this.formToggleHandler}>
                  Positive Results
                </Button>
              }
              { this.props.newOrTotal === "total" 
              ?
                null  // this hides the option to show Pos% on line graph if viewing TOTAL (instead of NEW)
              :
              this.props.includeGridLines.includePositivePercent
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includePositivePercent" onClick={this.formToggleHandler} active >
                  Positive Percentage
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includePositivePercent"  onClick={this.formToggleHandler}>
                  Positive Percentage
                </Button>
              }
              {this.props.includeGridLines.includeHospitalized
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeHospitalized" onClick={this.formToggleHandler} active >
                  Hospitalized
              </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeHospitalized"  onClick={this.formToggleHandler}>
                  Hospitalized
              </Button>
              }
              {this.props.includeGridLines.includeDeaths
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
              <h5>{this.state.totalDeath.length > 0 ? tableDescription(this.props.newOrTotal, this.props.selectedStatType, this.props.displayType, this.props.idOfStateInSingleStateGrid) : null }</h5>
            </Col>
          </Row>
          <Row  className="justify-content-md-center" >
            <Col md="auto" >
                {this.state.totalDeath.length > 0
                ?  
                  this.props.displayType === "table"
                  ?
                  <div id="statesTable" >
                    <GridBuilder
                      gridType="AllStates-PerDay"
                      allDatesArr={this.props.allDatesArr}
                      gridLinesArray={tableDataToDisplay()}
                      selectedStatType={this.props.selectedStatType} //ex: Pos, Neg, Total, Death
                      sortHandler={this.sortHandler}
                      // jumpToDisplayAndState={this.jumpToDisplayAndState}
                    />
                  </div>
                  :


                  (this.props.displayType === "singleStateChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="singleStateChart"
                                          // allDatesArr={this.props.staticDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.props.selectedStatType}
                                          includeTested={this.props.includeGridLines.includeTested}
                                          includeNegatives={this.props.includeGridLines.includeNegatives}
                                          includeDeaths={this.props.includeGridLines.includeDeaths}
                                          includePositives={this.props.includeGridLines.includePositives}
                                          includePositivePercent={this.props.includeGridLines.includePositivePercent}
                                          includeHospitalized={this.props.includeGridLines.includeHospitalized}
                                          filteredStayAtHomeOrders={this.props.stayAtHomeOrders.filter(obj => obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid) )}
                                          fetchData={this.fetchData}
                                          fromToDatesValue={this.state.fromToDatesValue}  //This is needed to display the correct dates and data after a 'get all data' fetch
                    />
                    // </div>
                  :
                  (this.props.displayType === "top10s")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="top10s"
                                          // allDatesArr={
                                          //   this.props.selectedStatType === "Hospitalized" 
                                          //   ?
                                          //     this.props.staticDatesArr.slice(16,-1)
                                          //     :
                                          //     this.props.staticDatesArr
                                          // }
                                          gridLinesArray={top10sData()}
                                          selectedStatType={this.props.selectedStatType}
                                          // newOrTotal={this.props.newOrTotal}
                                          includeTested={this.props.includeGridLines.includeTested}
                                          includeNegatives={this.props.includeGridLines.includeNegatives}
                                          includeDeaths={this.props.includeGridLines.includeDeaths}
                                          includePositives={this.props.includeGridLines.includePositives}
                                          includeHospitalized={this.props.includeGridLines.includeHospitalized}
                    />
                    // </div>
                  :
                  // null
                  (this.props.displayType === "rateOfGrowthChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="rateOfGrowthChart"
                                          // allDatesArr={this.props.staticDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.props.selectedStatType}
                                          // newOrTotal={this.props.newOrTotal}
                                          includeTested={this.props.includeGridLines.includeTested}
                                          includeNegatives={this.props.includeGridLines.includeNegatives}
                                          includeDeaths={this.props.includeGridLines.includeDeaths}
                                          includePositives={this.props.includeGridLines.includePositives}
                                          includeHospitalized={this.props.includeGridLines.includeHospitalized}
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



function mdp(dispatch) {
  return { 
    fetchAllStatesData: (countOfDays, fromToDatesValue) => dispatch(fetchAllStatesData(countOfDays, fromToDatesValue)),
    jumpToDisplayAndState: (displayType, stateName) => dispatch(jumpToDisplayAndState(displayType, stateName)),
    setSelectedStatType: (typeName) => dispatch(setSelectedStatType(typeName)),
    setNewOrTotal: (newOrTotal) => dispatch(setNewOrTotal(newOrTotal)),
    setDisplayType: (displayType) => dispatch(setDisplayType(displayType)),
    setIdOfStateInSingleStateGrid: (stateId) => dispatch(setIdOfStateInSingleStateGrid(stateId)),
    toggleGridlines: (gridline, newValue) => dispatch(toggleGridlines(gridline, newValue)),
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
    newOrTotal: state.newOrTotal,
    includeGridLines: state.includeGridLines
  }
}

export default connect(msp, mdp)(App)

