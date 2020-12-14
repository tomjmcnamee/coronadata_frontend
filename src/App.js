import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
import 'rsuite/dist/styles/rsuite-default.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
// import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'rsuite';
import { 
  mapStateIdToStateName,
  mapButtonNameToSelectedStatTypeValue
  } from './HelperFunctions/mappingIDtoSomething'
import { tableDescription } from './HelperFunctions/dynamicLabels'
import './App.css';
import { 
  fetchAllStatesData,
  jumpToDisplayAndState,
  setSelectedStatType,
  setNewOrTotal,
  setDisplayType,
  toggleGridlines,
  singleInitialLineChooser,
  } from './actions'

const loadingMap = 'https://s3.us-east-2.amazonaws.com/coronadata.tjm/USSpreadMap.gif'
const fetchingALLdataMapGif = 'https://s3.us-east-2.amazonaws.com/coronadata.tjm/fetchingALLdata.gif'


class App extends React.Component {
  state = {
    columnToSort: "state_name"
  }


  componentDidMount(){
    // document.title = "CoronaVirus Data"        
    this.props.fetchAllStatesData("37")
  }
  
  percentageForNewOnlyLogicHandler = (event) => {
    // This block resets StatType to Positive WHEN Pos% is active and use clicks TOTAL
    if (this.props.newOrTotal === "new" && this.props.selectedStatType === "PositivePercent" && event && event.target.dataset.buttontype === "newOrTotal" ) {
        this.props.setSelectedStatType("Positive")
    }
  }
   
  viewAndNewTotalButtonChangeHandler = (event) => {
      // this if statement adds the t.s.selectedStatType line when opening 'Single Single State Chart' line graph
      if (event.target.name === "multiStateChart") {
        this.props.singleInitialLineChooser(this.props.selectedStatType)
      }
      
      this.percentageForNewOnlyLogicHandler(event)
      // This IF block changes StatTyp FROM Pos% if 'Totals' button is clicked 
      if (event.target.dataset.buttontype === "newOrTotal") this.props.setNewOrTotal(event.target.name)
      if (event.target.dataset.buttontype === "displayType") this.props.setDisplayType(event.target.name)
           
      //// WORKING WHN ONLY HAS THE DROPDOWN
  }

  formToggleHandler = (event) => {
    if (this.props.displayType === "multiStateChart" )  {
      let newVal = !this.props.includeGridLines[event.target.name]
      this.props.toggleGridlines(event.target.name, newVal)

      if (event.target.name === "selectedStatType" ) this.props.setSelectedStatType(event.target.value)
    // debugger
    } else { 
      this.props.setSelectedStatType(mapButtonNameToSelectedStatTypeValue(event.target.name))
    }
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
    // debugger

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
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="table"  onClick={this.viewAndNewTotalButtonChangeHandler}>
                      Raw Numbers<br />Tables
                    </Button>
                  }
                  {this.props.displayType === "multiStateChart"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="multiStateChart" active >
                      Single State and <br />Aggregate Chart
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="multiStateChart"  onClick={this.viewAndNewTotalButtonChangeHandler}>
                      Single State and <br />Aggregate Chart
                    </Button>
                  }  
                  {this.props.displayType === "top10s"
                  ?
                    <Button className="maintypebuttonSelected" data-buttontype="displayType"  color="cyan" appearance="primary" size="sm" name="top10s" active >
                      Top 10<br />Charts
                    </Button>
                  :
                    <Button className="maintypebuttonNotSelected" data-buttontype="displayType"  color="cyan" appearance="ghost" size="sm" name="top10s"  onClick={this.viewAndNewTotalButtonChangeHandler}>
                      Top 10<br />Charts
                    </Button>
                  }
                </Form.Group  >
              </Form.Row>
            </Form >
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
                      <Button className="typebutton" data-buttontype="newOrTotal" appearance="ghost" size="md" name="new"  onClick={this.viewAndNewTotalButtonChangeHandler}>
                        New Per Day
                      </Button>
                    }
                    {this.props.newOrTotal === "total"
                    ?
                      <Button className="typebutton"  data-buttontype="newOrTotal" appearance="primary" size="md" name="total" active >
                        Total
                    </Button>
                    :
                      <Button className="typebutton"  data-buttontype="newOrTotal" appearance="ghost" size="md" name="total"  onClick={this.viewAndNewTotalButtonChangeHandler}>
                        Total
                    </Button>
                    }
                  </Form.Group  >
                </Form.Row>
              </Form>
            </Col>
          </Row>

          <Row>
              {(this.props.displayType === "multiStateChart" && this.props.includeGridLines.includeTested) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "Total")
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeTested" onClick={this.formToggleHandler} active >
                  Total Tested
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeTested"  onClick={this.formToggleHandler}>
                  Total Tested
                </Button>
              }
              {(this.props.displayType === "multiStateChart" && this.props.includeGridLines.includeNegatives) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "Negative")
              ?
              <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeNegatives" onClick={this.formToggleHandler} active >
                  Negative Results
                </Button>
              :
              <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeNegatives"  onClick={this.formToggleHandler}>
                  Negative Results
                </Button>
              }
              {(this.props.displayType === "multiStateChart" && this.props.includeGridLines.includePositives) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "Positive")
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
              (this.props.displayType === "multiStateChart" && this.props.includeGridLines.includePositivePercent) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "PositivePercent")
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includePositivePercent" onClick={this.formToggleHandler} active >
                  Positive Percentage
                </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includePositivePercent"  onClick={this.formToggleHandler}>
                  Positive Percentage
                </Button>
              }
              {(this.props.displayType === "multiStateChart" && this.props.includeGridLines.includeHospitalized) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "Hospitalized")
              ?
                <Button className="typebutton"  color="green" appearance="primary" size="sm" name="includeHospitalized" onClick={this.formToggleHandler} active >
                  Hospitalized
              </Button>
              :
                <Button className="typebutton"  color="green" appearance="ghost" size="sm" name="includeHospitalized"  onClick={this.formToggleHandler}>
                  Hospitalized
              </Button>
              }
              {(this.props.displayType === "multiStateChart" && this.props.includeGridLines.includeDeaths) || (this.props.displayType !== "multiStateChart" && this.props.selectedStatType === "Death")
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

          <Row>
            <Col sm={12} >
              <h5>{this.props.newDeath.length > 0 ? tableDescription(this.props.newOrTotal, this.props.selectedStatType, this.props.displayType) : null }</h5>
            </Col>
          </Row>
          <Row  className="justify-content-md-center" >
            <Col md="auto" >
                {this.props.newDeath.length > 0
                ?  
                  this.props.displayType === "table"
                  ?
                  <div id="statesTable" >
                    <GridBuilder
                      gridType="AllStates-PerDay"
                      sortHandler={this.sortHandler}
                      columnToSort={this.state.columnToSort}
                    />
                  </div>
                  :
                  (this.props.displayType === "multiStateChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                      gridType="multiStateChart"
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
                  this.props.allDatesArr.length === 0 
                  ?
                  <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                  :
                  <img src={fetchingALLdataMapGif} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                }
              </Col>
          </Row>
        </Container>
        <p>Updated once daily ~6:30pm Eastern. Data pulled from <a target="_blank" href="https://covidtracking.com/" rel="noopener noreferrer" >CovidTracking.com</a> (for more info, see <a target="_blank" href="https://talkingpointsmemo.com/edblog/key-source-of-covid-19-testing-infection-data"  rel="noopener noreferrer" >this article</a>).</p>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
    toggleGridlines: (gridline, newValue) => dispatch(toggleGridlines(gridline, newValue)),
    singleInitialLineChooser: (selectedStatType) => dispatch(singleInitialLineChooser(selectedStatType)),
  }
}

// this comes from reduct.js - K is local reference, V is foreign state attribute
function msp(state) {
  return { 
    allDatesArr: state.allDatesArr,
    // staticDatesArr: state.staticDatesArr,
    newDeath: state.newDeath,
    displayType: state.displayType,
    selectedStatType: state.selectedStatType,
    newOrTotal: state.newOrTotal,
    includeGridLines: state.includeGridLines,


    newPositive: state.newPositive,
    // newNegative: state.newNegative,
    // newPositivePercent: state.newPositivePercent,
    newTotal: state.newTotal,
    // newHospitalized: state.newHospitalized,
    // totalPositive: state.totalPositive,
    // totalNegative: state.totalNegative,
    // totalDeath: state.totalDeath,
    // totalTotal: state.totalTotal,
    // totalHospitalized: state.totalHospitalized,
  }
}

export default connect(msp, mdp)(App)