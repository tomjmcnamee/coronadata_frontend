import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab  from 'react-bootstrap/Tab'

import loadingMap from './assets/USSpreadMap.gif'
import 'rsuite/dist/styles/rsuite-default.css';
import { mapStateIdToStateName } from './HelperFunctions/mappingIDtoSomething'
import { Button } from 'rsuite';



class App extends React.Component {

  // AUTOLOGIN Check and Fetch

  state = {
    allDatesArr: [],
    staticDatesArr: [],
    newPositive: [],
    newNegative: [],
    newDeath: [],
    newTotal: [],
    totalPositive: [],
    totalNegative: [],
    totalPending: [],
    totalDeath: [],
    totalTotal: [],

    selectedStatType: "Positive",
    newOrTotal: "total",
    sortOrder: "NewToOld",

    displayType: "table",
    idOfStateInSingleStateGrid: "99",
    includeTestedAndNegatives: false,
    includePositives: true
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
          staticDatesArr: [...response.allDatesArr].reverse(),
          totalNegative: response.totalNegative,
          totalPending: response.totalPending,
          totalDeath: response.totalDeath,
          totalTotal: response.totalTotal,
          totalPositive: response.totalPositive          
        })
        console.log("Processing Time for TOTAL Fetch = ", ((+ new Date()) - startTime)/1000 )
        fetch(process.env.REACT_APP_FETCH_LOCATION + "new_stats", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
            // FetchPW: `${token}`
            FetchPW: process.env.REACT_APP_FETCH_PASSWORD
          }
        })  
        .then(resp => resp.json())
        .then((response) => {
          this.setState({
            newPositive: response.newPositive,
            newNegative: response.newNegative,
            newDeath: response.newDeath,
            newTotal: response.newTotal
          })
          console.log("Processing Time for NEW Fetch = ", ((+ new Date()) - startTime)/1000 )
        })
      })    
  }

  formChangeHandler = (event) => {
    // debugger
    if (event.target.dataset.buttontype) {
      // let newVal = event.target.name
      if (event.target.name === "new" &&this.state.selectedStatType === "Pending" ) {
        this.setState({
          selectedStatType: "Positive"
        })
      }
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
  
  dateSortOrder = () => {
    let sortOrder
    if (this.state.sortOrder === "NewToOld"){
      sortOrder = "OldToNew"
    } else {
      sortOrder = "NewToOld"
    }
    let newOrder = this.state.allDatesArr.reverse()
    this.setState({
      allDatesArr: newOrder,
      sortOrder: sortOrder
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
        count_types = [this.state.newOrTotal + "-total",this.state.newOrTotal + "-positive",this.state.newOrTotal + "-negative",this.state.newOrTotal + "-death"]
        state_type =  [this.state.newOrTotal + "Total",this.state.newOrTotal + "Positive",this.state.newOrTotal + "Negative",this.state.newOrTotal + "Death"]
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
    }
    return output
  }


  render() {



    let tableDescription = () => {
      if (this.state.displayType === "table"){
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
              case "Pending": return "Pending Tests"
              case "Death": return "Deaths"
              case "Total": return "Tests Submitted"
              default: return
            }
          }
          return `${newOrCumulative()} count of ${tableDesc()}`
        } else {
          if (this.state.displayType === "allOfUSGraph") {
            return `All data for the entire U.S.`
          } else {
            return `All data for ${mapStateIdToStateName(parseInt(this.state.idOfStateInSingleStateGrid))}`
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
            <Col  sm={3}>
              <Form >
                <Form.Row>
                  <Form.Group  >
                    {this.state.displayType === "table"
                    ?
                      <Form.Control as="select" name="selectedStatType" value={this.state.selectedStatType} onChange={this.formChangeHandler} > 
                        <option value="Positive">Test Results: Positive</option>
                        <option value="Negative">Test Results: Negative</option>
                        { this.state.newOrTotal === "new" ? null : <option value="Pending">Test Results: Pending</option>}
                        <option value="Death">Corona Deaths</option>
                        <option value="Total">Total Tested</option>
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
          <Row>
            <Form >
              <Form.Row>
                <Form.Group  >
                  
                  {this.state.displayType === "table"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="table" active >
                      Raw Numbers Table
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="table"  onClick={this.formChangeHandler}>
                      Raw Numbers Table
                    </Button>
                  }
                  {/* {this.state.displayType === "allOfUSGraph"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="allOfUSGraph" active >
                      All of U.S. Chart
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="allOfUSGraph"  onClick={this.formChangeHandler}>
                      All of U.S. Chart
                    </Button>
                  } */}
                  {this.state.displayType === "rateOfGrowthChart"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="rateOfGrowthChart" active >
                      Rates of Growth Chart
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="rateOfGrowthChart"  onClick={this.formChangeHandler}>
                      Rates of Growth Chart
                    </Button>
                  }
                  {this.state.displayType === "singleStateChart"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="singleStateChart" active >
                      Single State (and U.S.) Charts
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="singleStateChart"  onClick={this.formChangeHandler}>
                      Single State (and U.S.) Charts 
                    </Button>
                  }            
                </Form.Group  >
              </Form.Row>
            </Form >
          </Row>
          {(this.state.displayType === "singleStateChart" || this.state.displayType === "rateOfGrowthChart")
          ?
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                      <Form.Control as="select" name="idOfStateInSingleStateGrid" value={this.state.idOfStateInSingleStateGrid} onChange={this.formChangeHandler} > 
                      <option value={99}>{"Entire U.S."}</option>
                        {this.dropdownOptionsForStates()}
                      </Form.Control>
                  </Form.Group  >
                </Form.Row>
              </Form>
          </Row>  
          :
          null
          }
          {this.state.displayType === "table"
          ?
          null
          :
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                    <Form.Check type="checkbox" name="includeTestedAndNegatives" checked={this.state.includeTestedAndNegatives} label="Include 'Total Tested' and 'Negative Results'" onChange={this.formToggleHandler}/>
                  </Form.Group  >
                </Form.Row>
                <Form.Row>
                  <Form.Group  >
                    <Form.Check type="checkbox" name="includePositives" checked={this.state.includePositives} label="Include 'Positive Results'" onChange={this.formToggleHandler}/>
                  </Form.Group  >
                </Form.Row>
              </Form>
          </Row>  

          }
          <Row>
            <Col sm={12} >
              <h5>{tableDescription()}</h5>
            </Col>
          </Row>
          <Row  className="justify-content-md-center" >
            <Col md="auto" >
                {this.state.totalPositive.length > 0
                ?  
                  this.state.displayType === "table"
                  ?
                  <div id="statesTable" >
                    <GridBuilder
                    gridType="AllStates-PerDay"
                    allDatesArr={this.state.allDatesArr}
                    gridLinesArray={this.state[this.state.newOrTotal + this.state.selectedStatType]}
                    selectedStatType={this.state.selectedStatType}
                    />
                  </div>
                  :


                  (this.state.displayType === "allOfUSGraph" || this.state.displayType === "singleStateChart")
                  ?
                    // <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="singleStateChart"
                                          allDatesArr={this.state.staticDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.state.selectedStatType}
                                          includeTestedAndNegatives={this.state.includeTestedAndNegatives}
                                          includePositives={this.state.includePositives}
                    />
                    // </div>
                  :
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
                                          includePositives={this.state.includePositives}
                    />
                    // </div>
                  :
                  null
                :
                  <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                }
              </Col>
          </Row>
          <Row>
            {(this.state.totalPositive.length > 0 && this.state.displayType === "table" )
            ?
              this.state.sortOrder === "NewToOld"
              ?
                <Button className="typebutton" data-buttontype="sortOrder"  appearance="primary" size="md" name="OldToNew" active onClick={this.dateSortOrder}>
                  Reorder Dates: Oldest To Newest
                </Button> 
              :
                <Button className="typebutton" data-buttontype="sortOrder"  appearance="primary" size="md" name="NewToOld" active onClick={this.dateSortOrder}>
                  Reorder Dates: Newest To Oldest
                </Button>
            :
            null
            }
          </Row>
        </Container>
        <h6>Updated once daily at 5:30pm Eastern. Data pulled from <a target="_blank" href="https://covidtracking.com/" rel="noopener noreferrer" >CovidTracking.com</a> (for more info, see <a target="_blank" href="https://talkingpointsmemo.com/edblog/key-source-of-covid-19-testing-infection-data"  rel="noopener noreferrer" >this article</a>).</h6>
        {process.env.REACT_APP_VIEW_TRACKER === "true"
        ?
          <>
            <a  style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://hitwebcounter.com/counter/counter.php?page=7213589&style=0005&nbdigits=6&type=page&initCount=0" title="User Stats" Alt="PHP Hits Count"   border="0" />
            </a>                
            <a style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://hitwebcounter.com/counter/counter.php?page=7213591&style=0005&nbdigits=6&type=ip&initCount=0" title="User Stats" Alt="PHP Hits Count"   border="0" />              
            </a>
          </> 
        : null}
      </div>
    ) //ends return
  } // ends render
}  // ends App Class


export default App
