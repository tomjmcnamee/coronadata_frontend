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
import  MultiSelectDropdown  from './components/MultiSelectDropdown'
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
    // newPositive: [],   //in reducer
    // newNegative: [],   //in reducer
    // newPositivePercent: [],   //in reducer
    // newDeath: [],   //in reducer
    // newTotal: [],   //in reducer
    // newHospitalized: [],   //in reducer
    // totalPositive: [],   //in reducer
    // totalNegative: [],   //in reducer
    // totalDeath: [],   //in reducer
    // totalTotal: [],   //in reducer
    // totalHospitalized: [],   //in reducer

    // selectedStatType: "Death",  //in reducer
    // newOrTotal: "new",//in reducer

    // displayType: "table",  //in reducer
    // idOfStateInSingleStateGrid: "99",    //in reducer


    columnToSort: "state_name",

    fromToDatesValue: [] //in reducer
  }


  componentDidMount(){

    // document.title = "CoronaVirus Data"        
    this.props.fetchAllStatesData("30")
    
  }
  
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
            
    } else {
      // This handles the Dropdowns
      this.percentageLogicHandler(event)
      if (event.target.name === "selectedStatType") this.props.setSelectedStatType(event.target.value)
      if (event.target.name === "idOfStateInSingleStateGrid") this.props.setIdOfStateInSingleStateGrid(event.target.value)
    }
  }

  formToggleHandler = (event) => {
    let newVal = !this.props.includeGridLines[event.target.name]
    this.props.toggleGridlines(event.target.name, newVal)
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
        outputArr = [...this.props[this.props.newOrTotal + this.props.selectedStatType]]
      } else if (this.state.columnToSort === "first_number_col") {
        outputArr = [...this.props[this.props.newOrTotal + this.props.selectedStatType]].sort(function (a, b) { 
          if (a[lastDate] > b[lastDate]) return -1;
	        if (a[lastDate] < b[lastDate]) return 1;
        }  )
      }
      return outputArr
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
                  {this.props.displayType === "multiStateChart"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="multiStateChart" active >
                      Multi-State and<br />Regional Chart
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="multiStateChart"  onClick={this.formChangeHandler}>
                      Multi-State and<br />Regional Chart
                    </Button>
                  }  
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
              <h5>{this.props.totalDeath.length > 0 ? tableDescription(this.props.newOrTotal, this.props.selectedStatType, this.props.displayType, this.props.idOfStateInSingleStateGrid) : null }</h5>
            </Col>
          </Row>
          <Row  className="justify-content-md-center" >
            <Col md="auto" >
                {this.props.totalDeath.length > 0
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
                                          filteredStayAtHomeOrders={this.props.stayAtHomeOrders.filter(obj => obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid) )}
                    />
                  :
                  (this.props.displayType === "multiStateChart")
                  ?
                    <MultiSelectDropdown 
                                          // gridType="top10s"
                    />
                  :
                  (this.props.displayType === "top10s")
                  ?
                    <ChartBuilder 
                                          gridType="top10s"
                    />
                  :
                  
                  null
                :
                  this.props.newDeath.length === 0 
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

