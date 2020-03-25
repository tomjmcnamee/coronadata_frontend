import React from 'react';
import GridBuilder from './components/GridBuilder'
import ChartBuilder from './components/ChartBuilder'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Container, Row, Tabs, Tab} from 'react-bootstrap'
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
    sortOrder: "OldToNew",

    displayType: "table",
    idOfStateInSingleStateGrid: "35"
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
        console.log("coronaData---RESP ", response)
        this.setState({
          allDatesArr: response.allDatesArr,
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
          console.log("coronaData---RESP ", response)
          this.setState({
            newPositive: response.newPositive,
            newNegative: response.newNegative,
            newDeath: response.newDeath,
            newTotal: response.newTotal
          })
          console.log("Processing Time for NEW Fetch = ", ((+ new Date()) - startTime)/1000 )
        })
      })
    
      // .catch((error) => {
      //   debugger 
      //   console.log("Fetch Full Data errors - ", error)
      // });
    
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


    // fetch(process.env.REACT_APP_FETCH_LOCATION + "date_order", {
    //       method: "GET",
    //       headers: {
    //         "content-type": "application/json",
    //         accepts: "application/json",
    //         FetchPW: process.env.REACT_APP_FETCH_PASSWORD,
    //         SortOrder: sortOrder
    //       }
    //     })  
    //     .then(resp => resp.json())
    //     .then((response) => {
    //       console.log("coronaData---RESP ", response)
    //       this.setState({
    //         sortOrder: sortOrder,
    //         newNegative: response.allDatesArr
    //       })
    //     })
  }

  dropdownOptionsForStates = () => {
    let output = []
    for (let id = 1; id < 56; id++) {
      // Runs 5 times, with values of step 0 through 4.
      output.push(<option value={id}>{mapStateIdToStateName(parseInt(id))}</option>);
    }
    output.push(<option value={99}>Combined US Stats</option>)
    console.log("State Dropdownb Option = ", output)
    return output
  }

  singleStateData = () => {
    // debugger
    let output = []
    let count_types = []
    let state_type = []
    let chartColumnName = []
    if (this.state.displayType === "allOfUSGraph") {
      if (this.state.newOrTotal === "new") {
         count_types = ["new-total","new-positive","new-negative","new-death"]
         state_type =  ["newTotal","newPositive","newNegative","newDeath"]
         chartColumnName = [ "Tested", "Positive", "Negative", "Deaths"]
      }else {
         count_types = ["total-total","total-positive","total-negative","total-death"]
         state_type =  ["totalTotal","totalPositive","totalNegative","totalDeath"]
         chartColumnName = [ "Tested", "Positive", "Negative", "Deaths"]
      }

      
      for (let day of this.state.allDatesArr) { 
        let tempObj = {date: day, state_id: 99}
        let index = 0
        for (let ct of count_types) {
          tempObj[chartColumnName[index]] = this.state[state_type[index]].reduce( 
                    function(prev, curr) {
                      return prev + curr[day]
                    }, 0)
          index++
        }
        output.push(tempObj)
      }
    } else {
      if (this.state.newOrTotal === "new") {
        output.push(this.state.newDeath.find((obj) => obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)  ))
        output.push(this.state.newTotal.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
        output.push(this.state.newPositive.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
        output.push(this.state.newNegative.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      } else {
        output.push(this.state.totalDeath.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
        output.push(this.state.totalTotal.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
        output.push(this.state.totalPositive.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
        output.push(this.state.totalNegative.find((obj) =>  obj.state_id === parseInt(this.state.idOfStateInSingleStateGrid)))
      }
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
                  {this.state.displayType === "allOfUSGraph"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="allOfUSGraph" active >
                      All of U.S. Graph
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="allOfUSGraph"  onClick={this.formChangeHandler}>
                      All of U.S. Graph
                    </Button>
                  }
                  {this.state.displayType === "singleStateChart"
                  ?
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="primary" size="md" name="singleStateChart" active >
                      Single State Graph
                    </Button>
                  :
                    <Button className="typebutton" data-buttontype="displayType"  color="cyan" appearance="ghost" size="md" name="singleStateChart"  onClick={this.formChangeHandler}>
                      Single State Graph
                    </Button>
                  }            
                </Form.Group  >
              </Form.Row>
            </Form >
          </Row>
          {this.state.displayType === "singleStateChart"
          ?
          <Row>
            <Form >
                <Form.Row>
                  <Form.Group  >
                      <Form.Control as="select" name="idOfStateInSingleStateGrid" value={this.state.idOfStateInSingleStateGrid} onChange={this.formChangeHandler} > 
                        <option value="99">Combined US Stats</option>
                        {this.dropdownOptionsForStates()}
                      </Form.Control>
                  </Form.Group  >
                </Form.Row>
              </Form>
          </Row>  
          :
          null
          }
          <Row>
            <Col sm={12} >
              <h5>{tableDescription()}</h5>
            </Col>
          </Row>
          <Row>
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
                    <div id="LineChart" >
                    <ChartBuilder 
                                          gridType="singleStateChart"
                                          allDatesArr={this.state.allDatesArr}
                                          gridLinesArray={this.singleStateData()}
                                          selectedStatType={this.state.selectedStatType}
                    />
                    </div>
                  :
                  null
                :
                  <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
                }
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
        <h6>Updated once daily at 5:30pm Eastern. Data pulled from <a target="_blank" href="https://covidtracking.com/">CovidTracking.com</a> (for more info, see <a target="_blank" href="https://talkingpointsmemo.com/edblog/key-source-of-covid-19-testing-infection-data">this article</a>).</h6>
        <a style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank">
          <img src="https://hitwebcounter.com/counter/counter.php?page=7213589&style=0005&nbdigits=6&type=page&initCount=0" title="User Stats" Alt="PHP Hits Count"   border="0" />
        </a>                
        <a style={{display:"none"}} href="https://www.hitwebcounter.com" target="_blank">
          <img src="https://hitwebcounter.com/counter/counter.php?page=7213591&style=0005&nbdigits=6&type=ip&initCount=0" title="User Stats" Alt="PHP Hits Count"   border="0" />              
        </a> 
      </div>
    ) //ends return
  } // ends render
}  // ends App Class


export default App
