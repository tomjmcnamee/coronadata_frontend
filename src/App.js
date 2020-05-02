import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
import 'rsuite/dist/styles/rsuite-default.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab  from 'react-bootstrap/Tab'

import loadingMap from './assets/USSpreadMap.gif'
import { mapStateIdToStateName } from './HelperFunctions/mappingIDtoSomething'
import { Button } from 'rsuite';
import './App.css';



class App extends React.Component {

  // AUTOLOGIN Check and Fetch

  state = {
    allDatesArr: [],
    staticDatesArr: [],
    newPositive: [],
    newNegative: [],
    newDeath: [],
    newTotal: [],
    newHospitalized: [],
    totalPositive: [],
    totalNegative: [],
    totalDeath: [],
    totalTotal: [],
    totalHospitalized: [],
    stayAtHomeOrders: [],

    selectedStatType: "Death",
    newOrTotal: "total",

    displayType: "table",
    idOfStateInSingleStateGrid: "99",
    includeTestedAndNegatives: false,
    includePositivesAndHospitalized: true,

    columnToSort: "state_name"
  }


  componentDidMount(){

    // document.title = "CoronaVirus Data"        
    let startTime = (+ new Date())


    fetch(process.env.REACT_APP_FETCH_LOCATION + "total_stats", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        FetchPW: process.env.REACT_APP_FETCH_PASSWORD
      }
    })
    .then(resp => resp.json())
    .then((response) => {
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
          stayAtHomeOrders: response.stayAtHomeOrders
        })
        console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
      })    
  }

  formChangeHandler = (event) => {
    // debugger
    if (event.target.dataset.buttontype) {
      // This handles the BUTTONS
      this.setState({
        [event.target.dataset.buttontype]: event.target.name
      })
    } else {
      // This handles the Dropdowns
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
    for (let id = 1; id < 56; id++) {
      // Runs 5 times, with values of step 0 through 4.
      output.push(<option key={id} value={id}>{mapStateIdToStateName(parseInt(id))}</option>);
    }
    return output
  }

  singleStateData = () => {
    // debugger
    let output = []
    let count_types = []
    let state_type = []
    if (this.state.idOfStateInSingleStateGrid === "99") {
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
      // debugger
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
                    {(this.state.displayType === "table" || this.state.displayType === "top10s")
                    ?
                      <Form.Control as="select" name="selectedStatType" value={this.state.selectedStatType} onChange={this.formChangeHandler} > 
                        <option value="Positive">Test Results: Positive</option>
                        <option value="Negative">Test Results: Negative</option>
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
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                    <Form.Check type="checkbox" name="includeTestedAndNegatives" checked={this.state.includeTestedAndNegatives} label="Include 'Total Tested' and 'Negative Results'" onChange={this.formToggleHandler}/>
                  </Form.Group  >
                </Form.Row>
                <Form.Row>
                  <Form.Group  >
                    <Form.Check type="checkbox" name="includePositivesAndHospitalized" checked={this.state.includePositivesAndHospitalized} label="Include 'Positive Results' and 'Hospitalized'" onChange={this.formToggleHandler}/>
                  </Form.Group  >
                </Form.Row>
              </Form>
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
                                          includeTestedAndNegatives={this.state.includeTestedAndNegatives}
                                          includePositivesAndHospitalized={this.state.includePositivesAndHospitalized}
                                          stayAtHomeOrders={this.state.stayAtHomeOrders.filter(obj => obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid) )}
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
                                          includeTestedAndNegatives={this.state.includeTestedAndNegatives}
                                          includePositivesAndHospitalized={this.state.includePositivesAndHospitalized}
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
                                          includeTestedAndNegatives={this.state.includeTestedAndNegatives}
                                          includePositivesAndHospitalized={this.state.includePositivesAndHospitalized}
                    />
                    // </div>
                  :
                  null
                :
                  <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
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
