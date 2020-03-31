import React from 'react'
// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, CartesianAxis
} from 'recharts';

import { scaleLog } from 'd3-scale'
import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName, mapCountTypeToHumanReadableType } from '../HelperFunctions/mappingIDtoSomething' 

const scale = scaleLog().base(Math.E)

class ChartBuilder extends React.Component {

  state = {
    width: {
      "Positive": 3,
      "Negative": 3,
      "Tested": 3,
      "Deaths" : 3,
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

  formatYAxisForRateOfGrowth = (tickItem) => { return tickItem + "%" }

  yLabel = () => {
    if (this.props.newOrTotal==="new") {
      return 'RoG = (current - previous) / previous'
    } else {
      return 'RoG = (present - past) / past'
    }
  }



  render () {

    const tooltipStyle = {
      textAlign: 'left',
      // backgroundImage: 'url(' + imgUrl + ')',
    };

    const { width } = this.state
    let chartData = []
    let formattedGridLinesArr = [...this.props.gridLinesArray]
    switch(this.props.gridType) {
      case "AllStatesChart":

        
        if (formattedGridLinesArr.length > 0 ) {
          formattedGridLinesArr.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          for ( let date1 of this.props.allDatesArr) { chartData.push({date: date1})}
          chartData.forEach((dataObject, index) => 
            formattedGridLinesArr.forEach(stateDataObj =>
              dataObject[stateDataObj.state_name] = stateDataObj[this.props.allDatesArr[index]]
            )
          )
          console.log("This is the chart data ----" , chartData)
          } // ends GridLines IF statement


          return(                         
            <LineChart width={730} height={300} data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip offset={60} itemStyle={tooltipStyle} nd /> */}
              {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
              <Line type="monotone" dataKey="Alabama" stroke="#8884d8" />
<Line type="monotone" dataKey="Alaska" stroke="#8884d8" />
<Line type="monotone" dataKey="Arizona" stroke="#8884d8" />
<Line type="monotone" dataKey="Arkansas" stroke="#8884d8" />
<Line type="monotone" dataKey="California" stroke="#8884d8" />
<Line type="monotone" dataKey="Colorado" stroke="#8884d8" />
<Line type="monotone" dataKey="Connecticut" stroke="#8884d8" />
<Line type="monotone" dataKey="Delaware" stroke="#8884d8" />
<Line type="monotone" dataKey="Florida" stroke="#8884d8" />
<Line type="monotone" dataKey="Georgia" stroke="#8884d8" />
<Line type="monotone" dataKey="Hawaii" stroke="#8884d8" />
<Line type="monotone" dataKey="Idaho" stroke="#8884d8" />
<Line type="monotone" dataKey="Illinois" stroke="#8884d8" />
<Line type="monotone" dataKey="Indiana" stroke="#8884d8" />
<Line type="monotone" dataKey="Iowa" stroke="#8884d8" />
<Line type="monotone" dataKey="Kansas" stroke="#8884d8" />
<Line type="monotone" dataKey="Kentucky" stroke="#8884d8" />
<Line type="monotone" dataKey="Louisiana" stroke="#8884d8" />
<Line type="monotone" dataKey="Maine" stroke="#8884d8" />
<Line type="monotone" dataKey="Maryland" stroke="#8884d8" />
<Line type="monotone" dataKey="Massachusetts" stroke="#8884d8" />
<Line type="monotone" dataKey="Michigan" stroke="#8884d8" />
<Line type="monotone" dataKey="Minnesota" stroke="#8884d8" />
<Line type="monotone" dataKey="Mississippi" stroke="#8884d8" />
<Line type="monotone" dataKey="Missouri" stroke="#8884d8" />
<Line type="monotone" dataKey="Montana" stroke="#8884d8" />
<Line type="monotone" dataKey="Nebraska" stroke="#8884d8" />
<Line type="monotone" dataKey="Nevada" stroke="#8884d8" />
<Line type="monotone" dataKey="New Hampshire" stroke="#8884d8" />
<Line type="monotone" dataKey="New Jersey" stroke="#8884d8" />
<Line type="monotone" dataKey="New Mexico" stroke="#8884d8" />
<Line type="monotone" dataKey="New York" stroke="#8884d8" />
<Line type="monotone" dataKey="North Carolina" stroke="#8884d8" />
<Line type="monotone" dataKey="North Dakota" stroke="#8884d8" />
<Line type="monotone" dataKey="Ohio" stroke="#8884d8" />
<Line type="monotone" dataKey="Oklahoma" stroke="#8884d8" />
<Line type="monotone" dataKey="Oregon" stroke="#8884d8" />
<Line type="monotone" dataKey="Pennsylvania" stroke="#8884d8" />
<Line type="monotone" dataKey="Rhode Island" stroke="#8884d8" />
<Line type="monotone" dataKey="South Carolina" stroke="#8884d8" />
<Line type="monotone" dataKey="South Dakota" stroke="#8884d8" />
<Line type="monotone" dataKey="Tennessee" stroke="#8884d8" />
<Line type="monotone" dataKey="Texas" stroke="#8884d8" />
<Line type="monotone" dataKey="Utah" stroke="#8884d8" />
<Line type="monotone" dataKey="Vermont" stroke="#8884d8" />
<Line type="monotone" dataKey="Virginia" stroke="#8884d8" />
<Line type="monotone" dataKey="Washington" stroke="#8884d8" />
<Line type="monotone" dataKey="Washington DC" stroke="#8884d8" />
<Line type="monotone" dataKey="West Virginia" stroke="#8884d8" />
<Line type="monotone" dataKey="Wisconsin" stroke="#8884d8" />
<Line type="monotone" dataKey="Wyoming" stroke="#8884d8" />
<Line type="monotone" dataKey="American Samoa" stroke="#8884d8" />
<Line type="monotone" dataKey="Puerto Rico" stroke="#8884d8" />
<Line type="monotone" dataKey="US Virgin Islands" stroke="#8884d8" />
<Line type="monotone" dataKey="Guam" stroke="#8884d8" />
<Line type="monotone" dataKey="Northern Mariana Islands" stroke="#8884d8" />
<Line type="monotone" dataKey="US Totals" stroke="#8884d8" />
            </LineChart>
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

          console.log("This is the date from APP ----" , formattedGridLinesArr)
          console.log("This is the chart data ----" , chartData)
          } // ends GridLines IF statement

          return( 
            <ResponsiveContainer width="95%" height={300}>                        
            <LineChart  data={chartData}
              margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis   />
              <Tooltip offset={60} itemStyle={tooltipStyle} />
              <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
              {this.props.includePositives ? <Line type="monotone" dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }

              <Line type="monotone" dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
            </LineChart>
            </ResponsiveContainer>                        
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
          


          console.log("This is the date from APP ----" , formattedGridLinesArr)
          console.log("This is the chart data ----" , chartData)

          
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
              <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
              {this.props.includeTestedAndNegatives ? <Line type="monotone" dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
              {this.props.includePositives ? <Line type="monotone" dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
              <Line type="monotone" dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
            </LineChart>
            </ResponsiveContainer>                        
          ) // ends "singleStateChart" RETURN
     

      default:
        break
    } // ends switch
  }
}  // ends ChartBuilder class
export default ChartBuilder

