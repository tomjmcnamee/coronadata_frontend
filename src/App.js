import React from 'react';
import GridBuilder from './components/GridBuilder'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Container, Row} from 'react-bootstrap'
import loadingMap from './assets/USSpreadMap.gif'



class App extends React.Component {

  // AUTOLOGIN Check and Fetch

  state = {
    allDatesArr: [],
    newPositive: {},
    newNegative: {},
    newDeath: {},
    newTotal: {},
    totalPositive: {},
    totalNegative: {},
    totalPending: {},
    totalDeath: {},
    totalTotal: {},

    selectedStatType: "Positive",
    newOrTotal: "total"
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
    if (event.target.name === "new" || event.target.name === "total") {
      let newVal = event.target.name
      if (this.state.selectedStatType === "Pending" ) {
        this.setState({
          selectedStatType: "Positive"
        })
      } 
      this.setState({
        newOrTotal: newVal
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }



  render() {

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
          case "Pending": return "Pending Tests"
          case "Death": return "Deaths"
          case "Total": return "Tests Submitted"
          default: return
        }
      }

      return `${newOrCumulative()} count of ${tableDesc()}`
    }

    return (
      <div className="App">
        <Container>
          <Row > 
            <Col sm={12} >
              <h1>Corona Virus in the US: by the numbers</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
            </Col>
            <Col  sm={3}>
              <Form >
                <Form.Row>
                  <Form.Group  >
                    {/* <Form.Label>Type of stats</Form.Label> */}
                      <Form.Control as="select" name="selectedStatType" value={this.state.selectedStatType} onChange={this.formChangeHandler} > 
                        <option value="Positive">Test Results: Positive</option>
                        <option value="Negative">Test Results: Negative</option>
                        { this.state.newOrTotal === "new" ? null : <option value="Pending">Test Results: Pending</option>}
                        <option value="Death">Corona Deaths</option>
                        <option value="Total">Total Tested</option>
                      </Form.Control>
                  </Form.Group  >
                </Form.Row>
              </Form>
            </Col>
            <Col className="justify-content-center" sm={3}>
              <Form >
                <Form.Row>
                  <Form.Group  >
                    <Form.Check type="radio" name="new" label="New Per Day" checked={this.state.newOrTotal === "new"} onChange={this.formChangeHandler} />
                    <Form.Check type="radio" name="total" label="Total" checked={this.state.newOrTotal === "total"} onChange={this.formChangeHandler} /> 
                  </Form.Group  >
                  {/* <Form.Group  > */}
                  {/* </Form.Group  > */}
                </Form.Row>
              </Form>
            </Col>
            <Col sm={3}>
            </Col>
          </Row>
          <Row>
            <Col sm={12} >
              <h3>{tableDescription()}</h3>
            </Col>
          </Row>
          <Row>
            {this.state.totalPositive.length > 0
              ?  
                <GridBuilder
                  gridType="AllStates-PerDay"
                  allDatesArr={this.state.allDatesArr}
                  gridLinesArray={this.state[this.state.newOrTotal + this.state.selectedStatType]}
                  selectedStatType={this.state.selectedStatType}
                />
              :
                <img src={loadingMap} id="outbreak_map_gif" alt="Loading gif - outbreak map" ></img>
             }
          </Row>
        </Container>
        <h6>Updated once daily at 4:30pm Eastern. Data pulled from <a target="_blank" href="https://covidtracking.com/">CovidTracking.com</a> (for more info, see <a target="_blank" href="https://talkingpointsmemo.com/edblog/key-source-of-covid-19-testing-infection-data">this article</a>).</h6>

      </div>
    ) //ends return
  } // ends render
}  // ends App Class


export default App
