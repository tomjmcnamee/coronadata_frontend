import React from 'react'
// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName, mapCountTypeToHumanReadableType } from '../HelperFunctions/mappingIDtoSomething' 



class ChartBuilder extends React.Component {

  state = {
    width: {
      "Positive": 2,
      "Negative": 2,
      "Tested": 2,
      "Deaths" : 2,
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
      width: { ...width, [dataKey]: 4 },
    });
  }

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { width } = this.state;

    this.setState({
      width: { ...width, [dataKey]: 2 },
    });
  }
  
  render () {

    const { width } = this.state
    let chartData = []
    let formattedGridLinesArr = [...this.props.gridLinesArray]
    switch(this.props.gridType) {
      case "AllStatesChart":

        // const chartData = [
        //   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400,          },          {
        //     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,          },
        //   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },          {
        //     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,          },
        //   {            name: 'Page E', uv: 1890, pv: 4800, amt: 2181,          },
        //   {
        //     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,          },
        //   {            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        //   },        ];
        
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
              <Tooltip />
              {/* <Legend /> */}
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
          if (formattedGridLinesArr[0].state_id == 99) {
            chartData = formattedGridLinesArr
          } else {
            for ( let date1 of this.props.allDatesArr) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
              formattedGridLinesArr.forEach(stateTypeObj =>
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.props.allDatesArr[index]]
              )
            )
          }


          console.log("This is the date from APP ----" , formattedGridLinesArr)
          console.log("This is the chart data ----" , chartData)
          } // ends GridLines IF statement

// debugger
          return( 
            <ResponsiveContainer width="95%" height={300}>                        
            <LineChart  data={chartData}
              margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
              {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
              {/* <Line type="monotone" dataKey="Alabama" stroke="#8884d8" /> */}



{this.props.includeTestedAndNegatives 
?
  <Line type="monotone" dataKey="Negative" strokeWidth={width["Negative"]} stroke="#E5A419"   />
:
null
}
{this.props.includeTestedAndNegatives 
?
  <Line type="monotone" dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/>
:
null
}

<Line type="monotone" dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   />
<Line type="monotone" dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="grey"   />
{/* 
<Line type="monotone" dataKey="Day Positive" strokeWidth={width["Day Positive"]} stroke="pink"   />
<Line type="monotone" dataKey="Day Negative" strokeWidth={width["Day Negative"]} stroke="#E5A419"   />
<Line type="monotone" dataKey="Day Tested" strokeWidth={width["Day Tested"]} stroke="#1973E5"/>
<Line type="monotone" dataKey="Day Deaths" strokeWidth={width["Day Deaths"]} stroke="grey"   />
<Line type="monotone" dataKey="Total Tested" strokeWidth={width["Total Tested"]} stroke="#2F19E5"   />
<Line type="monotone" dataKey="Total Positive" strokeWidth={width["Total Positive"]} stroke="#E51919"   />
<Line type="monotone" dataKey="Total Negative" strokeWidth={width["Total Negative"]} stroke="#229954"   />
<Line type="monotone" dataKey="Total Deaths" strokeWidth={width["Total Deaths"]} stroke="black"   /> */}

{/* <Line type="monotone" dataKey="new-total" stroke="#8884d8" />
<Line type="monotone" dataKey="new-positive" stroke="#8884d8" />
<Line type="monotone" dataKey="new-negative" stroke="#8884d8" />
<Line type="monotone" dataKey="new-death" stroke="#8884d8" />
<Line type="monotone" dataKey="total-total" stroke="#8884d8" />
<Line type="monotone" dataKey="total-positive" stroke="#8884d8" />
<Line type="monotone" dataKey="total-negative" stroke="#8884d8" />
<Line type="monotone" dataKey="total-death" stroke="#8884d8" /> */}




            </LineChart>
            </ResponsiveContainer>                        


          ) // ends "singleStateChart" RETURN

      default:
        break
    } // ends switch
  }
}  // ends ChartBuilder class
export default ChartBuilder

