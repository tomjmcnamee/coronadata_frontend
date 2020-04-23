import React from 'react'
import { DateRangePicker } from 'rsuite';
// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine
} from 'recharts';

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName, mapCountTypeToHumanReadableType } from '../HelperFunctions/mappingIDtoSomething' 


class ChartBuilder extends React.Component {

  state = {
    width: {
      "Positive": 3,
      "Negative": 3,
      "Tested": 3,
      "Deaths" : 3,
      "Hospitalized" : 3,
      "Alabama": 3,
      "Alaska": 3,
      "Arizona": 3,
      "Arkansas": 3,
      "California": 3,
      "Colorado": 3,
      "Connecticut": 3,
      "Delaware": 3,
      "Florida": 3,
      "Georgia": 3,
      "Hawaii": 3,
      "Idaho": 3,
      "Illinois": 3,
      "Indiana": 3,
      "Iowa": 3,
      "Kansas": 3,
      "Kentucky": 3,
      "Louisiana": 3,
      "Maine": 3,
      "Maryland": 3,
      "Massachusetts": 3,
      "Michigan": 3,
      "Minnesota": 3,
      "Mississippi": 3,
      "Missouri": 3,
      "Montana": 3,
      "Nebraska": 3,
      "Nevada": 3,
      "New Hampshire": 3,
      "New Jersey": 3,
      "New Mexico": 3,
      "New York": 3,
      "North Carolina": 3,
      "North Dakota": 3,
      "Ohio": 3,
      "Oklahoma": 3,
      "Oregon": 3,
      "Pennsylvania": 3,
      "Rhode Island": 3,
      "South Carolina": 3,
      "South Dakota": 3,
      "Tennessee": 3,
      "Texas": 3,
      "Utah": 3,
      "Vermont": 3,
      "Virginia": 3,
      "Washington": 3,
      "Washington DC": 3,
      "West Virginia": 3,
      "Wisconsin": 3,
      "Wyoming": 3,
      "American Samoa": 3,
      "Puerto Rico": 3,
      "US Virgin Islands": 3,
      "Guam": 3,
      "Northern Mariana Islands": 3
      // "Total Tested": 2,
      // "Total Positive": 2,
      // "Total Negative": 2,
      // "Total Deaths" :2
    },
  };

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { width } = this.state;
    this.setState({
      width: { ...width, [dataKey]: 6 },
    });
  }

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { width } = this.state;
    this.setState({
      width: { ...width, [dataKey]: 3 },
    });
  }

  handleLegendClick = (o) => {
    const { dataKey } = o;
    const { width } = this.state;
    let newWidth = 6
    if (this.state.width[dataKey] === 6) {
      newWidth = 3
    }
    this.setState({
      width: { ...width, [dataKey]: newWidth },
    });
  }

  formatYAxisForRateOfGrowth = (tickItem) => { return tickItem + "%" }

  yLabel = () => {
    if (this.props.newOrTotal==="new") {
      return 'RoG = (current - previous) / previous'
    } else {
      return 'RoG = (present - total) / total'
    }
  }





  render () {

   

    const tooltipStyle = {
      textAlign: 'left',
      // backgroundImage: 'url(' + imgUrl + ')',
    };

    let formattedGridLinesArr = [...this.props.gridLinesArray]
    const { width } = this.state
    let chartData = []
    let chartLines = []
    const top10Colors = ["#FF0000", "#FF1493", "#EE82EE", "#8A2BE2", "#FF8C00", "#D2691E", "#00FF00", "#20B2AA", "#00BFFF", "#0000FF"]
    switch(this.props.gridType) {
      case "top10s":

        // Keep these next two, verifies SOMETHING and adds state name to Obj
        if (formattedGridLinesArr.length > 0 ) {
          formattedGridLinesArr.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          for ( let date1 of this.props.allDatesArr) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
          chartData.forEach((dataObject, index) => 
            formattedGridLinesArr.forEach(stateDataObj =>
              dataObject[stateDataObj.state_name] = stateDataObj[this.props.allDatesArr[index]]
            )
          )
          chartLines = formattedGridLinesArr.map((obj, index) => <Line key={index} dot={false} type="monotone" dataKey={obj.state_name} strokeWidth={width[obj.state_name]} stroke={top10Colors[index]} />)
          // for (let obj of )
        } // ends GridLines IF statement


          return(                         
            <ResponsiveContainer width="95%" height={300}>                        
            <LineChart  data={chartData}
              margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis   />
              <Tooltip offset={60} itemStyle={tooltipStyle} />
              {/* <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} /> */}
              <Legend onClick={this.handleLegendClick} />
              {chartLines}
            </LineChart>
            </ResponsiveContainer>
          ) // ends "AllStatesChart" RETURN




      case "singleStateChart":
        if (formattedGridLinesArr.length > 0 ) {
          //This checks to see if its for the WHOLE US or not
            for ( let date1 of this.props.allDatesArr) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
              formattedGridLinesArr.forEach(stateTypeObj =>
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.props.allDatesArr[index]]
              )
            )
          } // ends GridLines IF statement
          
          let stayAtHomeOrderXReferences
          if (this.props.stayAtHomeOrders.length > 0 ) {
            stayAtHomeOrderXReferences = this.props.stayAtHomeOrders.map(obj => <ReferenceLine x={getMonthDayFromYYYYMMDD(obj.date)} stroke={obj.orderAction === "lifted" ? 'green':'red'}  >
                <Label position="insideTop">{obj.orderAction === "lifted" ? `Stay At Home: Lifted`:`Stay At Home: Imposed`}</Label>
              </ReferenceLine>)
          }

          return( 
            <>
            <ResponsiveContainer width="95%" height={300}>                        
            <LineChart  data={chartData}
              margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis   />
              <Tooltip offset={60} itemStyle={tooltipStyle} />
              {/* <ReferenceLine x="03/23" stroke="green" label="Min PAGE" /> */}
              {stayAtHomeOrderXReferences}
              <Legend onClick={this.handleLegendClick} iconType="wye"  />
              {this.props.includeTestedAndNegatives ? <Line  dot={false}   dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
              {this.props.includeTestedAndNegatives ? <Line  dot={false}   dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
              {this.props.includePositivesAndHospitalized ? <Line  dot={false}   dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
              {this.props.includePositivesAndHospitalized ? <Line  dot={false}   dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke="black"   /> :null }


              <Line dot={false} type="monotone"  dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
            </LineChart>
            </ResponsiveContainer>                        
          </>
          ) // ends "singleStateChart" RETURN

      case "rateOfGrowthChart":
        let chartMax = 500
        let chartMin = -500
        if (formattedGridLinesArr.length > 0 ) {
          //This checks to see if its for the WHOLE US or not

            for ( let date1 of this.props.allDatesArr) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
            formattedGridLinesArr.forEach(stateTypeObj =>
                //let tempVal = stateTypeObj[this.props.allDatesArr[index]] // This is the origina, just print the value
                
                {if (index === 0) {
                  dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = null
                } else {
                  //if yesterday's AND today's numbers were NOT 0 or null   ---- IDEAL
                  if (!!stateTypeObj[this.props.allDatesArr[index]] && !!stateTypeObj[this.props.allDatesArr[index -1 ]] ) {
                    dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = ((stateTypeObj[this.props.allDatesArr[index]] - stateTypeObj[this.props.allDatesArr[index - 1]] ) / stateTypeObj[this.props.allDatesArr[index - 1]]) *100
                  } else if (!stateTypeObj[this.props.allDatesArr[index]]) {
                    dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = 0
                  } else if (!stateTypeObj[this.props.allDatesArr[index - 1]]) {
                    dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.props.allDatesArr[index]]
                  }
                  if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] > chartMax) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMax}
                  if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] < chartMin) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMin}
                }} //Closes Original IF
                

              )
            )
          } // ends GridLines IF statement

          function gridTooltipValFormatter(value, name) {
            if (value === chartMax) {
              return `>${value.toFixed(2)}%`
            } else if (value === chartMin) {
                return `<${value.toFixed(2)}%`
            }else {
                return `${value.toFixed(2)}%`
            }
          }  

          return( 
            <ResponsiveContainer width="90%" height={300}>                        
            <LineChart  data={chartData}
              margin={{ top: 5, right: 1, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <CartesianAxis tickLine="false"     /> */}
              <XAxis dataKey="date" />
              <YAxis tickFormatter={this.formatYAxisForRateOfGrowth}>
                <Label angle={-90} position='insideBottomLeft' >{this.yLabel()}</Label>
              </YAxis>
              <Tooltip  
              formatter={gridTooltipValFormatter}
              labelFormatter={(value) => `RoG for ${value}` }
              offset={60} itemStyle={tooltipStyle} nMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} iconSize={30}/>
              <Legend onClick={this.handleLegendClick} />
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dot={false} dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dot={false} dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
              {this.props.includePositivesAndHospitalized ? <Line type="monotone" dot={false} dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
              {this.props.includePositivesAndHospitalized ? <Line type="monotone" dot={false} dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke="black"   /> :null }
              <Line type="monotone" dot={false} dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
            </LineChart>
            </ResponsiveContainer>                        
          ) // ends "singleStateChart" RETURN
     

      default:
        break
    } // ends switch
  }
}  // ends ChartBuilder class
export default ChartBuilder

