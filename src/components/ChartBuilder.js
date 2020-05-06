import React from 'react'
import { DateRangePicker } from 'rsuite'
// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine
} from 'recharts';

import { getMonthDayFromYYYYMMDD, 
  getDashSeperatedInDATEFormatFromYYYYMMDD, 
  getDashSeperatedDateFromYYYYMMDD,
  getYYYYMMDDfromFormattedDate  } from '../HelperFunctions/DateFormatting' 
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
    datePickerValue: [],
    displayDates: [],
    average: false
  };

  componentDidMount(){
    this.setState({
      datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[1]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )],
      displayDates: [...this.props.allDatesArr]
    })
  }


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

  datePickerChangeHandler = (value) => {
    if (value.length === 0) {
      // This denotes the "CLEAN 'X' "
      this.setState({ 
        datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[0]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )],
        displayDates: [...this.props.allDatesArr]
       })
    } else {
      this.setState({ 
        datePickerValue: value,
        displayDates: this.newDisplayDateArr(value)
       })
    }
  }

  newDisplayDateArr = (value) => {
    let startIndex = this.props.allDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[0]))
    let endIndex = this.props.allDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[1]))  
    let arrToReturn = this.props.allDatesArr.slice(startIndex, endIndex + 1)
    return arrToReturn
  }


  
  
  
  render () {
    const sevenDayAverageCalculator = (inputObj, outputObj, datesArr) => {
      let i = 6
      while (i < datesArr.length) {
        outputObj[datesArr[i]] = Math.trunc((inputObj[datesArr[i]] + (inputObj[datesArr[i-1]]) + (inputObj[datesArr[i-2]]) + (inputObj[datesArr[i-3]]) + (inputObj[datesArr[i-4]]) + 
        (inputObj[datesArr[i-5]]) + (inputObj[datesArr[i-6]]))/7)
        i++
      }
    }

    const {
      allowedMaxDays,
      allowedDays,
      allowedRange,
      beforeToday,
      afterToday,
      combine
    } = DateRangePicker;


    let dateRangePicker = () => {
      return <DateRangePicker 
                cleanable={false}
                showOneCalendar
                disabledDate={allowedRange(getDashSeperatedDateFromYYYYMMDD(this.props.allDatesArr[1]), getDashSeperatedDateFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1))}         
                value={this.state.datePickerValue}
                onChange={(value) => this.datePickerChangeHandler(value) }
        ranges={[{
          label: 'Last 7',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 7]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )]
          // value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)]
        }, {
          label: 'Last 14',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 14]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )]
        }, {
          label: 'Last 30',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 30]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )]
        }, {
          label: 'All available',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[1]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )]
        }]}
      />
    }

    const tooltipStyle = {
      textAlign: 'left',
      // backgroundImage: 'url(' + imgUrl + ')',
    };

    let formattedGridLinesArr = [...this.props.gridLinesArray]
    const { width } = this.state
    let chartData = []
    let chartLines = []
    const top10Colors = ["#FF0000", "#00BFFF", "#EE82EE", "#00FF00", "#8A2BE2", "#FF8C00", "#D2691E", "#20B2AA", "#FF1493", "#0000FF"]
    switch(this.props.gridType) {
      case "top10s":

        // Keep these next two, verifies SOMETHING and adds state name to Obj
        if (formattedGridLinesArr.length > 0 ) {
          formattedGridLinesArr.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
          chartData.forEach((dataObject, index) => 
            formattedGridLinesArr.forEach(stateDataObj =>
              dataObject[stateDataObj.state_name] = stateDataObj[this.state.displayDates[index]]
            )
          )
          chartLines = formattedGridLinesArr.map((obj, index) => <Line key={index} dot={false} type="monotone" dataKey={obj.state_name} strokeWidth={width[obj.state_name]} stroke={top10Colors[index]} />)
          // for (let obj of )
        } // ends GridLines IF statement


          return(     
            <>
            {dateRangePicker()}                    
              <ResponsiveContainer width="95%" height={300}>                        
              <LineChart  data={chartData}
                margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis   />
                <Tooltip offset={60} itemStyle={tooltipStyle} />
                <Legend onClick={this.handleLegendClick} iconType="wye"  />
                {chartLines}
              </LineChart>
              </ResponsiveContainer>
            </>
          ) // ends "AllStatesChart" RETURN




          case "singleStateChart":
            // let averageDeaths = {}
            if (formattedGridLinesArr.length > 0 ) {
              /// This builds the 7-day Average numbers
              let newDeathsObj = formattedGridLinesArr.find( obj => obj.count_type === "new-death")
              let averageDeaths = {...newDeathsObj}
              if (newDeathsObj && Object.keys(newDeathsObj).length > 0) {
                let dates = Object.keys(newDeathsObj).filter( k => k.startsWith("2020"))
                sevenDayAverageCalculator(newDeathsObj, averageDeaths, dates)
                averageDeaths["count_type"] = "7DayAverage"
                formattedGridLinesArr.push(averageDeaths)
              }



          //This checks to see if its for the WHOLE US or not

            for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
              formattedGridLinesArr.forEach(stateTypeObj =>
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.state.displayDates[index]]
              )
            )
          } // ends GridLines IF statement

          let stayAtHomeOrderXReferences
          if (this.props.stayAtHomeOrders.length > 0 ) {
            stayAtHomeOrderXReferences = this.props.stayAtHomeOrders.map(obj => <ReferenceLine x={getMonthDayFromYYYYMMDD(obj.date)} stroke={obj.orderAction === "lifted" ? 'green':'red'}  >
                <Label position="insideTop">{obj.order_action === "lifted" ? `Stay At Home: Lifted`:`Stay At Home: Imposed`}</Label>
              </ReferenceLine>)
          }

          return( 
            <>
            {dateRangePicker()}
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
              {this.props.includeTestedAndNegatives ? <Line  dot={false}   dataKey="Negative" strokeWidth={width["Negative"]} stroke="#F39C12"   /> :null }
              {this.props.includeTestedAndNegatives ? <Line  dot={false}   dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
              {this.props.includePositivesAndHospitalized ? <Line  dot={false}   dataKey="Positive" strokeWidth={width["Positive"]} stroke="#12F315"   /> :null }
              {this.props.includePositivesAndHospitalized ? <Line  dot={false}   dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke="black"   /> :null }


              <Line dot={false} type="monotone"  dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
              {/* <Line dot={false} type="monotone"  dataKey="Average Deaths per day over previous 7 days" strokeWidth={2} stroke="red"   />  */}
              { this.props.gridLinesArray[0]["count_type"].startsWith("new") ? <Line dot={false} type="monotone"  dataKey="Deaths: 7 day average" strokeWidth={2} stroke="red"   /> : null}
            </LineChart>
            </ResponsiveContainer>                        
          </>
          ) // ends "singleStateChart" RETURN

      case "rateOfGrowthChart":


        let chartMax = 100
        let chartMin = -100
        if (formattedGridLinesArr.length > 0 ) {
          //This checks to see if its for the WHOLE US or not

          for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}

    /// Averaging-out logic Starts here
            let tempRoGAveragesData = []
            let dates = Object.keys(formattedGridLinesArr[0]).filter( k => k.startsWith("2020"))
            formattedGridLinesArr.forEach( function(obj) {
              
              let tempObj = {...obj}
              sevenDayAverageCalculator(obj, tempObj, dates)
            tempRoGAveragesData.push(tempObj)
          })  // Ends forEach to geet average of all values
          formattedGridLinesArr = [...tempRoGAveragesData]
    /// Averaging-out logic Stops here

          chartData.forEach((dataObject, index) => 
          formattedGridLinesArr.forEach(stateTypeObj =>              
              {if (index === 0) {
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = null
              } else {
                //if yesterday's AND today's numbers were NOT 0 or null   ---- IDEAL
                if (!!stateTypeObj[this.state.displayDates[index]] && !!stateTypeObj[this.state.displayDates[index -1 ]] ) {
                  dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = ((stateTypeObj[this.state.displayDates[index]] - stateTypeObj[this.state.displayDates[index - 1]] ) / stateTypeObj[this.state.displayDates[index - 1]]) *100
                } else if (!stateTypeObj[this.state.displayDates[index]]) {
                  dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = 0
                } else if (!stateTypeObj[this.state.displayDates[index - 1]]) {
                  dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.state.displayDates[index]]
                }
                if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] > chartMax) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMax}
                if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] < chartMin) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMin}
              }} //Closes Original IF
            )
          )
        } // ends GridLines IF statements

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
          <>
          {dateRangePicker()}
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
            <Legend onClick={this.handleLegendClick} iconType="wye"  />
            {this.props.includeTestedAndNegatives ? <Line type="monotone" dot={false} dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
            {this.props.includeTestedAndNegatives ? <Line type="monotone" dot={false} dataKey="Tested" strokeWidth={width["Tested"]} stroke="#1973E5"/> :null }
            {this.props.includePositivesAndHospitalized ? <Line type="monotone" dot={false} dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
            {this.props.includePositivesAndHospitalized ? <Line type="monotone" dot={false} dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke="black"   /> :null }
            <Line type="monotone" dot={false} dataKey="Deaths" strokeWidth={width["Deaths"]} stroke="purple"   />
          </LineChart>
          </ResponsiveContainer>       
          </>                 
        ) // ends "singleStateChart" RETURN
     

      default:
        break
    } // ends switch
  }
}  // ends ChartBuilder class
export default ChartBuilder

