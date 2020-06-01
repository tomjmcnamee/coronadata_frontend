import React from 'react'
import { DateRangePicker } from 'rsuite'

// import Table  from 'react-bootstrap/Table'
// import LineChart from "@rsuite/charts/lib/charts/LineChart";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine, LegendPayload
} from 'recharts';

import { getMonthDayFromYYYYMMDD, 
  getDashSeperatedInDATEFormatFromYYYYMMDD, 
  getDashSeperatedDateFromYYYYMMDD,
  getYYYYMMDDfromFormattedDate,
  buildSecondIndexOfDatePickerValue  } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName, mapCountTypeToHumanReadableType } from '../HelperFunctions/mappingIDtoSomething' 


class ChartBuilder extends React.Component {

  state = {
    width: {
      "Positive": 3,
      "Negative": 3,
      "Tested": 3,
      "Deaths" : 3,
      "Hospitalized" : 3,
      "Positive %" : 3,
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
    average: false,
    colors: {
      death: "purple",
      hospitalized: "red",
      positive: "#12F315",
      tested: "#1973E5",
      negative: "#F39C12",
      positivePercent: "grey"
    }
  };

  

  componentDidMount(){
    //// This IF statement checks to see if a 'get all data' fetch was run
    if (!this.props.fromToDatesValue) {
      this.setState({
        //// These two defaults to the last 30 days
        // datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 30]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )],
        // displayDates: this.newDisplayDateArr([getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 30]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )])
        
        //// Use the below to default to ALL available dates
        // datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[1]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] ).setDate(getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] ).getDate() + 1)],
        datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[1]),  new Date(buildSecondIndexOfDatePickerValue(this.props.allDatesArr))],
        displayDates: [...this.props.allDatesArr]
      })
      // debugger
    } else {
      // The page is being reloaded after a 'get all data' fetch
      this.setState({
        datePickerValue: this.props.fromToDatesValue,
        displayDates: this.newDisplayDateArr(this.props.fromToDatesValue)
      })
    }
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

  

  newDisplayDateArr = (value) => {
    let startIndex = this.props.allDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[0]))
    let endIndex = this.props.allDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[1]))  
    let arrToReturn = this.props.allDatesArr.slice(startIndex, endIndex + 1)
    return arrToReturn
  }


  datePickerChangeHandler = (value) => {
    if (
        ((getYYYYMMDDfromFormattedDate(value[0]) >= 20200228))
        &&
        (getYYYYMMDDfromFormattedDate(value[0]) < this.props.allDatesArr[0])
        && 
        (!!this.props.allDatesArr && this.props.allDatesArr.length < 35 )
      ) {
      this.props.fetchData("all", value)
      this.setState({ 
        datePickerValue: value,
        displayDates: this.newDisplayDateArr(value)
       })
    } else {
      this.setState({ 
        datePickerValue: value,
        displayDates: this.newDisplayDateArr(value)
       })
    }
    // if (value.length === 0) {
    //   // This denotes the "CLEAN 'X' "
    //   this.setState({ 
    //     datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[0]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1 )],
    //     displayDates: [...this.props.allDatesArr]
    //    })
    // } else {
    // }
    // debugger
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
                disabledDate={allowedRange(getDashSeperatedInDATEFormatFromYYYYMMDD(20200229), getDashSeperatedDateFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 1] + 1))}         
                value={(!!this.props.allDatesArr && this.props.allDatesArr.length < 35 ) ? this.state.datePickerValue : this.state.datePickerValue }
                onChange={(value) => this.datePickerChangeHandler(value) }
        ranges={[{
          label: 'Last 7',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 7]), new Date(buildSecondIndexOfDatePickerValue(this.props.allDatesArr))]
          // value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)]
        }, {
          label: 'Last 14',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 14]), new Date(buildSecondIndexOfDatePickerValue(this.props.allDatesArr))]
        }, {
          label: 'Last 30',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.allDatesArr[this.props.allDatesArr.length - 30]), new Date(buildSecondIndexOfDatePickerValue(this.props.allDatesArr))]
        }, {
          label: 'All available',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(20200229), new Date(buildSecondIndexOfDatePickerValue(this.props.allDatesArr))]
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
              
              // let dataTypeArr =  [ "total", "positive", "negative", "death", "hospitalized"  ]
              // let dataTypeVarName =  [ "newtotalObj", "newpositiveObj", "newnegativeObj", "newdeathObj", "newhospitalizedObj"  ]
              
              for (let dataSetObj of formattedGridLinesArr) {
                // debugger    
                let tempAveragesArr = []
                if ( Object.keys(dataSetObj).length > 0 && dataSetObj.count_type !== "PositivePercent") {
                  let tempAveragesObj = {}
                  let dates = Object.keys(dataSetObj).filter( k => k.startsWith("2020"))
                  sevenDayAverageCalculator(dataSetObj, tempAveragesObj, dates)
                  let tempCountType = dataSetObj["count_type"]
                  tempAveragesObj["count_type"] = tempCountType + "-avg"
                  tempAveragesArr.push(tempAveragesObj)
                }

                formattedGridLinesArr = [ ...formattedGridLinesArr, ...tempAveragesArr]

              } //  Ends For...In formattedFridlineArr
          

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
            stayAtHomeOrderXReferences = this.props.stayAtHomeOrders.map((obj, index) => <ReferenceLine key={index} x={getMonthDayFromYYYYMMDD(obj.date)} stroke={obj.orderAction === "lifted" ? 'green':'red'}  >
                <Label position="insideTop">{obj.order_action === "lifted" ? `Stay At Home: Lifted`:`Stay At Home: Imposed`}</Label>
              </ReferenceLine>)
          }
          
          

          let legendPayload = [
            { color:this.state.colors.tested,
              dataKey:"Tested",
              inactive:false,
              type:this.props.includeTested?"plainline":"none",
              value:"Tested",
              payload:{dot:false,
                dataKey:"Tested",
                strokeWidth:3,
                stroke:this.state.colors.tested,
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            },
            { color:this.state.colors.negative,
              dataKey:"Negative",
              inactive:false,
              type:this.props.includeNegatives?"plainline":"none",
              value:"Negative",
              payload:{dot:false,
                dataKey:"Negative",
                strokeWidth:3,
                stroke:this.state.colors.negative,
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            },
            { color: this.state.colors.positive,
              dataKey:"Positive",
              inactive:false,
              type:this.props.includePositives?"plainline":"none",
              value:"Positive",
              payload:{dot:false,
                  dataKey:"Positive",
                  strokeWidth:3,
                  stroke:this.state.colors.positive,
                  xAxisId:0,
                  yAxisId:0,
                  connectNulls:false,
                  activeDot:true,
                  legendType:"line",
                  fill:"#fff",
                  points:[],
                  isAnimationActive:true,
                  animateNewValues:true,
                  animationBegin:0,
                  animationDuration:1500,
                  animationEasing:"ease",
                  hide:false
                }
              } ,
              { color:this.state.colors.hospitalized,
                dataKey:"Hospitalized",
                inactive:false,
              type:this.props.includeHospitalized?"plainline":"none",
              value:"Hospitalized",
              payload:{dot:false,
                dataKey:"Hospitalized ",
                strokeWidth:3,
                stroke:this.state.colors.hospitalized,
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            },
            { color:this.state.colors.death,
              dataKey:"Deaths",
              inactive:false,
              type:this.props.includeDeaths?"plainline":"none",
              value:"Deaths",
              payload:{dot:false,
                dataKey:"Deaths",
                strokeWidth:3,
                stroke:this.state.colors.death,
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            },
            { color:this.state.colors.positivePercent,
              dataKey:"Positive %",
              inactive:false,
              type:this.props.gridLinesArray[0]["count_type"].startsWith("new") ? "plainline" : "none" ,
              value:"Positive %",
              payload:{dot:false,
                dataKey:"Positive %",
                strokeWidth:3,
                stroke:this.state.colors.positivePercent,
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            },
            { color:"black",
              dataKey:"Deaths: 7 day average",
              inactive:false,
              type:this.props.gridLinesArray[0]["count_type"].startsWith("new") && (this.props.includeTested || this.props.includeNegatives || this.props.includeDeaths || this.props.includePositives || this.props.includeHospitalized) ? "plainline" : "none" ,
              value:"7 day averages",
              payload:{dot:false,
                dataKey:"Deaths: 7 day average",
                strokeWidth:3,
                strokeDasharray:"3 3",
                stroke:"black",
                xAxisId:0,
                yAxisId:0,
                connectNulls:false,
                activeDot:true,
                legendType:"line",
                fill:"#fff",
                points:[],
                isAnimationActive:true,
                animateNewValues:true,
                animationBegin:0,
                animationDuration:1500,
                animationEasing:"ease",
                hide:false
              }
            }
          ]


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
              {/* <Legend onClick={this.handleLegendClick} iconType="plainline"  iconSize={30} /> */}
              <Legend payload={legendPayload}    iconType="plainline"  iconSize={30}  />
            

              {/* isAnimationActive={false} */}

              {this.props.includeNegatives ? <Line animationDuration={400} dot={false}   dataKey="Negative" strokeWidth={width["Negative"]} stroke={this.state.colors.negative}   /> :null }
              {this.props.includeTested ? <Line animationDuration={400}  dot={false}   dataKey="Tested" strokeWidth={width["Tested"]} stroke={this.state.colors.tested}/> :null }
              {this.props.includePositives ? <Line animationDuration={400}  dot={false}   dataKey="Positive" strokeWidth={width["Positive"]} stroke={this.state.colors.positive}   /> :null }
              {this.props.includeHospitalized ? <Line animationDuration={400}  dot={false}   dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke={this.state.colors.hospitalized}   /> :null }
              {this.props.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths" strokeWidth={width["Deaths"]}  stroke={this.state.colors.death}   /> :null }
              {/* { this.props.gridLinesArray[0]["count_type"].startsWith("new") ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Negative %" strokeWidth={2} stroke="black"    /> : null} */}
              { this.props.includePositivePercent ? this.props.gridLinesArray[0]["count_type"].startsWith("new") ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive %" strokeWidth={width["Positive %"]} stroke={this.state.colors.positivePercent}    /> : null : null}
              
              { this.props.includeTested ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Total-avg" strokeWidth={2} stroke={this.state.colors.total}   strokeDasharray="3 3" /> : null}
              { this.props.includeNegatives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Negative-avg" strokeWidth={2} stroke={this.state.colors.negative}   strokeDasharray="3 3" /> : null}
              { this.props.includePositives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive-avg" strokeWidth={2} stroke={this.state.colors.positive}   strokeDasharray="3 3" /> : null}
              { this.props.includeHospitalized ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Hospitalized-avg" strokeWidth={2} stroke={this.state.colors.hospitalized}   strokeDasharray="3 3" /> : null}
              { this.props.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths-avg" strokeWidth={2} stroke={this.state.colors.death}   strokeDasharray="3 3" /> : null}
              
              

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
            {this.props.includeNegatives ? <Line type="monotone" dot={false} dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
            {this.props.includeTested ? <Line type="monotone" dot={false} dataKey="Tested" strokeWidth={width["Tested"]} stroke={this.state.colors.tested}/> :null }
            {this.props.includePositives ? <Line type="monotone" dot={false} dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
            {this.props.includeHospitalized ? <Line type="monotone" dot={false} dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke={this.state.colors.hospitalized}   /> :null }
            {this.props.includeDeaths ?  <Line type="monotone" dot={false} dataKey="Deaths" strokeWidth={width["Deaths"]} stroke={this.state.colors.death}   /> :null }
            
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

