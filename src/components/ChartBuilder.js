import React, { useState }   from 'react'
import { DateRangePicker } from 'rsuite'
import { connect } from 'react-redux'
import  MultiSelectDropdown  from './MultiSelectDropdown'
import { setMultiSelectedStates } from '../actions'
import { aggregateForPosPercentages } from '../HelperFunctions/mathFunctions'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine, LegendPayload
} from 'recharts';

import { getMonthDayFromYYYYMMDD, 
  getDashSeperatedInDATEFormatFromYYYYMMDD, 
  getDashSeperatedDateFromYYYYMMDD,
  getYYYYMMDDfromFormattedDate,
  buildSecondIndexOfDatePickerValue  } from '../HelperFunctions/DateFormatting' 
import { mapStateIdToStateName, mapCountTypeToHumanReadableType } from '../HelperFunctions/mappingIDtoSomething' 
import { fetchAllStatesData } from '../actions'
import MultiSelect from "react-multi-select-component";


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
    selected: [],
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
        // datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 30]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] + 1 )],
        // displayDates: this.newDisplayDateArr([getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 30]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] + 1 )])
        
        //// Use the below to default to ALL available dates
        // datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[1]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] ).setDate(getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] ).getDate() + 1)],
        datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[1]),  new Date(buildSecondIndexOfDatePickerValue(this.props.staticDatesArr))],
        displayDates: [...this.props.staticDatesArr]
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
    let startIndex = this.props.staticDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[0]))
    let endIndex = this.props.staticDatesArr.indexOf(getYYYYMMDDfromFormattedDate(value[1]))  
    let arrToReturn = this.props.staticDatesArr.slice(startIndex, endIndex + 1)
    return arrToReturn
  }


  datePickerChangeHandler = (value) => {
    if (
        ((getYYYYMMDDfromFormattedDate(value[0]) >= 20200228))
        &&
        (getYYYYMMDDfromFormattedDate(value[0]) < this.props.staticDatesArr[0])
        && 
        (!!this.props.staticDatesArr && this.props.staticDatesArr.length < 35 )
      ) {
      this.props.fetchAllStatesData("all", value)
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
    //     datePickerValue: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[0]), getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] + 1 )],
    //     displayDates: [...this.props.staticDatesArr]
    //    })
    // } else {
    // }
    // debugger
  }  


  singleStateData = () => {
    let output = []
    let count_types = []
    let state_type = []

    //This IF builds all 'Etire US' data sets to send along
    if (this.props.idOfStateInSingleStateGrid == "99") {
      /////This does all the calucaitons APP side and 1 Obj PER DAY to be passed directly to the Chart
        count_types = [this.props.newOrTotal + "-total",this.props.newOrTotal + "-positive",this.props.newOrTotal + "-negative",this.props.newOrTotal + "-death",this.props.newOrTotal + "-hospitalized"]
        state_type =  [this.props.newOrTotal + "Total",this.props.newOrTotal + "Positive",this.props.newOrTotal + "Negative",this.props.newOrTotal + "Death",this.props.newOrTotal + "Hospitalized"]

        let index = 0
        let tempObj
        for (let countT of count_types) {
          tempObj = {state_id: 99, "count_type": countT}
          for (let day of this.props.staticDatesArr) {
            tempObj[day] = this.props[state_type[index]].reduce(
              function(prev, curr) {
                return prev + curr[day]
              }, 0)
            }
          index++
          output.push(tempObj)
        }
        //This next if statement doesn't send Postive% data to grid if t.s.newOrTotal = total
        if (this.props.newOrTotal === "new") {
          output.push(this.props[this.props.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === 99))
        }

    } else {
      output.push(this.props[this.props.newOrTotal + "Death"].find((obj) => obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)  ))
      output.push(this.props[this.props.newOrTotal + "Total"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.props[this.props.newOrTotal + "Positive"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.props[this.props.newOrTotal + "Negative"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      output.push(this.props[this.props.newOrTotal + "Hospitalized"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      if (this.props.newOrTotal === "new") {
        output.push(this.props[this.props.newOrTotal + "PositivePercent"].find((obj) =>  obj.state_id === parseInt(this.props.idOfStateInSingleStateGrid)))
      }
    }
    return output
  }

  multiStateData = () => {
    let output = []
    let count_types = []
    let state_type = []

if (this.props.multiSelectedStatesIdsArr.length > 0) {
        count_types = [this.props.newOrTotal + "-total",this.props.newOrTotal + "-positive",this.props.newOrTotal + "-negative",this.props.newOrTotal + "-death",this.props.newOrTotal + "-hospitalized"]
        state_type =  [this.props.newOrTotal + "Total",this.props.newOrTotal + "Positive",this.props.newOrTotal + "Negative",this.props.newOrTotal + "Death",this.props.newOrTotal + "Hospitalized"]

        let index = 0
        let tempObj
        let filteredArrayOfTypes
        let selectedStateIdsArr = this.props.multiSelectedStatesIdsArr.map(obj => obj.value)
        for (let countT of count_types) {
          filteredArrayOfTypes = this.props[state_type[index]].filter(({state_id}) => selectedStateIdsArr.includes(state_id));

          tempObj = {state_id: 100, "count_type": countT}
          for (let day of this.props.staticDatesArr) {
          // debugger
            tempObj[day] = filteredArrayOfTypes.reduce(
              function(prev, curr) {
                return prev + curr[day]
              }, 0)
            }
          index++
          output.push(tempObj)
        }
        //This next if statement doesn't send Postive% data to grid if t.s.newOrTotal = total
        if (this.props.newOrTotal === "new") {
          output.push(aggregateForPosPercentages(this.props.staticDatesArr, this.props.newPositive, this.props.newTotal, this.props.multiSelectedStatesIdsArr))
        }

        return output
      }
  }
  
  top10sData = () => {
    let output = []
    let lastDate = this.props.staticDatesArr[this.props.staticDatesArr.length - 1]

    let sortedObjects = [...this.props[this.props.newOrTotal + this.props.selectedStatType]].sort(function (a, b) { 
      if (a[lastDate] > b[lastDate]) return -1;
      if (a[lastDate] < b[lastDate]) return 1;
    }  )
    let top10StateIDs = sortedObjects.slice(0,10).map(obj => obj.state_id)
    for (let id of top10StateIDs) {
      output.push(this.props[this.props.newOrTotal + this.props.selectedStatType].find((obj) => obj.state_id === id  ))
    }
    return output
  }

  // setMultiSelect = (event) => {
  //   this.setState({
  //     selected: event
  //   })
  //   
  // }



  
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
      // allowedMaxDays,
      // allowedDays,
      // beforeToday,
      // afterToday,
      // combine,
      allowedRange
    } = DateRangePicker;


    let dateRangePicker = () => {
      return <DateRangePicker 
                cleanable={false}
                showOneCalendar
                disabledDate={allowedRange(getDashSeperatedInDATEFormatFromYYYYMMDD(20200229), getDashSeperatedDateFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 1] + 1))}         
                value={(!!this.props.staticDatesArr && this.props.staticDatesArr.length < 35 ) ? this.state.datePickerValue : this.state.datePickerValue }
                onChange={(value) => this.datePickerChangeHandler(value) }
        ranges={[{
          label: 'Last 7',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 7]), new Date(buildSecondIndexOfDatePickerValue(this.props.staticDatesArr))]
          // value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)]
        }, {
          label: 'Last 14',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 14]), new Date(buildSecondIndexOfDatePickerValue(this.props.staticDatesArr))]
        }, {
          label: 'Last 30',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(this.props.staticDatesArr[this.props.staticDatesArr.length - 30]), new Date(buildSecondIndexOfDatePickerValue(this.props.staticDatesArr))]
        }, {
          label: 'since 2-28-20',
          value: [getDashSeperatedInDATEFormatFromYYYYMMDD(20200229), new Date(buildSecondIndexOfDatePickerValue(this.props.staticDatesArr))]
        }]}
      /> // Closes DateRangePicker component call
    }

    const tooltipStyle = {
      textAlign: 'left',
      // backgroundImage: 'url(' + imgUrl + ')',
    };

    // let formattedGridLinesArr = [...this.props.gridLinesArray]
    let top10sDataSet = this.top10sData()
    let singleStateChartDataSet = this.singleStateData()
    let multiStateChartDataSet = this.multiStateData()
    const { width } = this.state
    let chartData = []
    let chartLines = []
    const top10Colors = ["#FF0000", "#00BFFF", "#EE82EE", "#00FF00", "#8A2BE2", "#FF8C00", "#D2691E", "#20B2AA", "#FF1493", "#0000FF"]
    
    let legendPayload = [
      { color:this.state.colors.tested,
        dataKey:"Tested",
        inactive:false,
        type:this.props.includeGridLines.includeTested?"plainline":"none",
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
        type:this.props.includeGridLines.includeNegatives?"plainline":"none",
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
        type:this.props.includeGridLines.includePositives?"plainline":"none",
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
        type:this.props.includeGridLines.includeHospitalized?"plainline":"none",
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
        type:this.props.includeGridLines.includeDeaths?"plainline":"none",
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
        type:!!chartData[0] && chartData[0]["count_type"].startsWith("new") ? this.props.includeGridLines.includePositivePercent ? "plainline" : "none" : "none",
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
        type: chartData[0] && chartData[0]["count_type"].startsWith("new") && (this.props.includeGridLines.includeTested || this.props.includeGridLines.includeNegatives || this.props.includeGridLines.includeDeaths || this.props.includeGridLines.includePositives || this.props.includeGridLines.includeHospitalized) ? "plainline" : "none" ,
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

    const dropdownOptions = [
      {value: 1, label: "Alabama", stateabbreviation: "AL"},
      {value: 2, label: "Alaska", stateabbreviation: "AK"},
      {value: 3, label: "Arizona", stateabbreviation: "AZ"},
      {value: 4, label: "Arkansas", stateabbreviation: "AR"},
      {value: 5, label: "California", stateabbreviation: "CA"},
      {value: 6, label: "Colorado", stateabbreviation: "CO"},
      {value: 7, label: "Connecticut", stateabbreviation: "CT"},
      {value: 8, label: "Delaware", stateabbreviation: "DE"},
      {value: 9, label: "Florida", stateabbreviation: "FL"},
      {value: 10, label: "Georgia", stateabbreviation: "GA"},
      {value: 11, label: "Hawaii", stateabbreviation: "HI"},
      {value: 12, label: "Idaho", stateabbreviation: "ID"},
      {value: 13, label: "Illinois", stateabbreviation: "IL"},
      {value: 14, label: "Indiana", stateabbreviation: "IN"},
      {value: 15, label: "Iowa", stateabbreviation: "IA"},
      {value: 16, label: "Kansas", stateabbreviation: "KS"},
      {value: 17, label: "Kentucky", stateabbreviation: "KY"},
      {value: 18, label: "Louisiana", stateabbreviation: "LA"},
      {value: 19, label: "Maine", stateabbreviation: "ME"},
      {value: 20, label: "Maryland", stateabbreviation: "MD"},
      {value: 21, label: "Massachusetts", stateabbreviation: "MA"},
      {value: 22, label: "Michigan", stateabbreviation: "MI"},
      {value: 23, label: "Minnesota", stateabbreviation: "MN"},
      {value: 24, label: "Mississippi", stateabbreviation: "MS"},
      {value: 25, label: "Missouri", stateabbreviation: "MO"},
      {value: 26, label: "Montana", stateabbreviation: "MT"},
      {value: 27, label: "Nebraska", stateabbreviation: "NE"},
      {value: 28, label: "Nevada", stateabbreviation: "NV"},
      {value: 29, label: "New Hampshire", stateabbreviation: "NH"},
      {value: 30, label: "New Jersey", stateabbreviation: "NJ"},
      {value: 31, label: "New Mexico", stateabbreviation: "NM"},
      {value: 32, label: "New York", stateabbreviation: "NY"},
      {value: 33, label: "North Carolina", stateabbreviation: "NC"},
      {value: 34, label: "North Dakota", stateabbreviation: "ND"},
      {value: 35, label: "Ohio", stateabbreviation: "OH"},
      {value: 36, label: "Oklahoma", stateabbreviation: "OK"},
      {value: 37, label: "Oregon", stateabbreviation: "OR"},
      {value: 38, label: "Pennsylvania", stateabbreviation: "PA"},
      {value: 39, label: "Rhode Island", stateabbreviation: "RI"},
      {value: 40, label: "South Carolina", stateabbreviation: "SC"},
      {value: 41, label: "South Dakota", stateabbreviation: "SD"},
      {value: 42, label: "Tennessee", stateabbreviation: "TN"},
      {value: 43, label: "Texas", stateabbreviation: "TX"},
      {value: 44, label: "Utah", stateabbreviation: "UT"},
      {value: 45, label: "Vermont", stateabbreviation: "VT"},
      {value: 46, label: "Virginia", stateabbreviation: "VA"},
      {value: 47, label: "Washington", stateabbreviation: "WA"},
      {value: 48, label: "Washington DC", stateabbreviation: "DC"},
      {value: 49, label: "West Virginia", stateabbreviation: "WV"},
      {value: 50, label: "Wisconsin", stateabbreviation: "WI"},
      {value: 51, label: "Wyoming", stateabbreviation: "WY"},
      {value: 53, label: "Puerto Rico", stateabbreviation: "PR"},
      // {value: 80, label: "REGION - West", stateabbreviation: "R_West"},
      // {value: 81, label: "REGION - MidWest", stateabbreviation: "R_MidWest"}
      ]
   
    // const [selected, setSelected] = useState([]);
    
    switch(this.props.gridType) {
      case "top10s":

        // Keep these next two, verifies SOMETHING and adds state name to Obj
        if (top10sDataSet.length > 0 ) {
          top10sDataSet.forEach( obj => obj.state_name = `${mapStateIdToStateName(obj.state_id)}`)
          for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
          chartData.forEach((dataObject, index) => 
            top10sDataSet.forEach(stateDataObj =>
              dataObject[stateDataObj.state_name] = stateDataObj[this.state.displayDates[index]]
            )
          )
          chartLines = top10sDataSet.map((obj, index) => <Line key={index} dot={false} type="monotone" dataKey={obj.state_name} strokeWidth={width[obj.state_name]} stroke={top10Colors[index]} />)
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
            if (singleStateChartDataSet.length > 0 ) {
              /// This builds the 7-day Average numbers
              
              // let dataTypeArr =  [ "total", "positive", "negative", "death", "hospitalized"  ]
              // let dataTypeVarName =  [ "newtotalObj", "newpositiveObj", "newnegativeObj", "newdeathObj", "newhospitalizedObj"  ]
              
              // debugger    
              for (let dataSetObj of singleStateChartDataSet) {
                let tempAveragesArr = []
                if ( Object.keys(dataSetObj).length > 0 && dataSetObj.count_type !== "PositivePercent") {
                  let tempAveragesObj = {}
                  let dates = Object.keys(dataSetObj).filter( k => k.startsWith("2020"))
                  sevenDayAverageCalculator(dataSetObj, tempAveragesObj, dates)
                  let tempCountType = dataSetObj["count_type"]
                  tempAveragesObj["count_type"] = tempCountType + "-avg"
                  tempAveragesArr.push(tempAveragesObj)
                }

                singleStateChartDataSet = [ ...singleStateChartDataSet, ...tempAveragesArr]

              } //  Ends For...In formattedFridlineArr
          

          //This checks to see if its for the WHOLE US or not
            for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
              singleStateChartDataSet.forEach(stateTypeObj =>
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.state.displayDates[index]]
              )
            )
          } // ends GridLines IF statement

          let stayAtHomeOrderXReferences
          if (this.props.filteredStayAtHomeOrders.length > 0 ) {
            stayAtHomeOrderXReferences = this.props.filteredStayAtHomeOrders.map((obj, index) => <ReferenceLine key={index} x={getMonthDayFromYYYYMMDD(obj.date)} stroke={obj.orderAction === "lifted" ? 'green':'red'}  >
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
              {/* <Legend onClick={this.handleLegendClick} iconType="plainline"  iconSize={30} /> */}
              <Legend payload={legendPayload}    iconType="plainline"  iconSize={30}  />
            

              {/* isAnimationActive={false} */}

              {this.props.includeGridLines.includeNegatives ? <Line animationDuration={400} dot={false}   dataKey="Negative" strokeWidth={width["Negative"]} stroke={this.state.colors.negative}   /> :null }
              {this.props.includeGridLines.includeTested ? <Line animationDuration={400}  dot={false}   dataKey="Tested" strokeWidth={width["Tested"]} stroke={this.state.colors.tested}/> :null }
              {this.props.includeGridLines.includePositives ? <Line animationDuration={400}  dot={false}   dataKey="Positive" strokeWidth={width["Positive"]} stroke={this.state.colors.positive}   /> :null }
              {this.props.includeGridLines.includeHospitalized ? <Line animationDuration={400}  dot={false}   dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke={this.state.colors.hospitalized}   /> :null }
              {this.props.includeGridLines.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths" strokeWidth={width["Deaths"]}  stroke={this.state.colors.death}   /> :null }
              { this.props.includeGridLines.includePositivePercent ? singleStateChartDataSet[0]["count_type"].startsWith("new") ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive %" strokeWidth={width["Positive %"]} stroke={this.state.colors.positivePercent}    /> : null : null}
              
              { this.props.includeGridLines.includeTested ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Total-avg" strokeWidth={2} stroke={this.state.colors.total}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeNegatives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Negative-avg" strokeWidth={2} stroke={this.state.colors.negative}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includePositives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive-avg" strokeWidth={2} stroke={this.state.colors.positive}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeHospitalized ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Hospitalized-avg" strokeWidth={2} stroke={this.state.colors.hospitalized}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths-avg" strokeWidth={2} stroke={this.state.colors.death}   strokeDasharray="3 3" /> : null}
              
              

            </LineChart>
            </ResponsiveContainer>                        
          </>
          ) // ends "singleStateChart" RETURN

          case "multiStateChart":

            // let averageDeaths = {}
            if (multiStateChartDataSet) {
              /// This builds the 7-day Average numbers
              
              // let dataTypeArr =  [ "total", "positive", "negative", "death", "hospitalized"  ]
              // let dataTypeVarName =  [ "newtotalObj", "newpositiveObj", "newnegativeObj", "newdeathObj", "newhospitalizedObj"  ]
              
              // debugger    
              for (let dataSetObj of multiStateChartDataSet) {
                let tempAveragesArr = []
                if ( Object.keys(dataSetObj).length > 0 && dataSetObj.count_type !== "PositivePercent") {
                  let tempAveragesObj = {}
                  let dates = Object.keys(dataSetObj).filter( k => k.startsWith("2020"))
                  sevenDayAverageCalculator(dataSetObj, tempAveragesObj, dates)
                  let tempCountType = dataSetObj["count_type"]
                  tempAveragesObj["count_type"] = tempCountType + "-avg"
                  tempAveragesArr.push(tempAveragesObj)
                }

                multiStateChartDataSet = [ ...multiStateChartDataSet, ...tempAveragesArr]

              } //  Ends For...In formattedFridlineArr
          

          //This checks to see if its for the WHOLE US or not
            for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}
            chartData.forEach((dataObject, index) => 
              multiStateChartDataSet.forEach(stateTypeObj =>
                dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.state.displayDates[index]]
              )
            )
          } // ends GridLines IF statement

          // let stayAtHomeOrderXReferences
          // if (this.props.filteredStayAtHomeOrders.length > 0 ) {
          //   stayAtHomeOrderXReferences = this.props.filteredStayAtHomeOrders.map((obj, index) => <ReferenceLine key={index} x={getMonthDayFromYYYYMMDD(obj.date)} stroke={obj.orderAction === "lifted" ? 'green':'red'}  >
          //       <Label position="insideTop">{obj.order_action === "lifted" ? `Stay At Home: Lifted`:`Stay At Home: Imposed`}</Label>
          //     </ReferenceLine>)
          // }
          
          

          // legendPayload = [
          //   { color:this.state.colors.tested,
          //     dataKey:"Tested",
          //     inactive:false,
          //     type:this.props.includeGridLines.includeTested?"plainline":"none",
          //     value:"Tested",
          //     payload:{dot:false,
          //       dataKey:"Tested",
          //       strokeWidth:3,
          //       stroke:this.state.colors.tested,
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   },
          //   { color:this.state.colors.negative,
          //     dataKey:"Negative",
          //     inactive:false,
          //     type:this.props.includeGridLines.includeNegatives?"plainline":"none",
          //     value:"Negative",
          //     payload:{dot:false,
          //       dataKey:"Negative",
          //       strokeWidth:3,
          //       stroke:this.state.colors.negative,
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   },
          //   { color: this.state.colors.positive,
          //     dataKey:"Positive",
          //     inactive:false,
          //     type:this.props.includeGridLines.includePositives?"plainline":"none",
          //     value:"Positive",
          //     payload:{dot:false,
          //         dataKey:"Positive",
          //         strokeWidth:3,
          //         stroke:this.state.colors.positive,
          //         xAxisId:0,
          //         yAxisId:0,
          //         connectNulls:false,
          //         activeDot:true,
          //         legendType:"line",
          //         fill:"#fff",
          //         points:[],
          //         isAnimationActive:true,
          //         animateNewValues:true,
          //         animationBegin:0,
          //         animationDuration:1500,
          //         animationEasing:"ease",
          //         hide:false
          //       }
          //     } ,
          //     { color:this.state.colors.hospitalized,
          //       dataKey:"Hospitalized",
          //       inactive:false,
          //     type:this.props.includeGridLines.includeHospitalized?"plainline":"none",
          //     value:"Hospitalized",
          //     payload:{dot:false,
          //       dataKey:"Hospitalized ",
          //       strokeWidth:3,
          //       stroke:this.state.colors.hospitalized,
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   },
          //   { color:this.state.colors.death,
          //     dataKey:"Deaths",
          //     inactive:false,
          //     type:this.props.includeGridLines.includeDeaths?"plainline":"none",
          //     value:"Deaths",
          //     payload:{dot:false,
          //       dataKey:"Deaths",
          //       strokeWidth:3,
          //       stroke:this.state.colors.death,
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   },
          //   { color:this.state.colors.positivePercent,
          //     dataKey:"Positive %",
          //     inactive:false,
          //     type:(multiStateChartDataSet && multiStateChartDataSet[0]["count_type"].startsWith("new")) ? this.props.includeGridLines.includePositivePercent ? "plainline" : "none" : "none",
          //     value:"Positive %",
          //     payload:{dot:false,
          //       dataKey:"Positive %",
          //       strokeWidth:3,
          //       stroke:this.state.colors.positivePercent,
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   },
          //   { color:"black",
          //     dataKey:"Deaths: 7 day average",
          //     inactive:false,
          //     type: multiStateChartDataSet && multiStateChartDataSet[0]["count_type"].startsWith("new") && (this.props.includeGridLines.includeTested || this.props.includeGridLines.includeNegatives || this.props.includeGridLines.includeDeaths || this.props.includeGridLines.includePositives || this.props.includeGridLines.includeHospitalized) ? "plainline" : "none" ,
          //     value:"7 day averages",
          //     payload:{dot:false,
          //       dataKey:"Deaths: 7 day average",
          //       strokeWidth:3,
          //       strokeDasharray:"3 3",
          //       stroke:"black",
          //       xAxisId:0,
          //       yAxisId:0,
          //       connectNulls:false,
          //       activeDot:true,
          //       legendType:"line",
          //       fill:"#fff",
          //       points:[],
          //       isAnimationActive:true,
          //       animateNewValues:true,
          //       animationBegin:0,
          //       animationDuration:1500,
          //       animationEasing:"ease",
          //       hide:false
          //     }
          //   }
          // ]

          // let lData = () => this.legendPayload(chartData)
          return( 
            <>

          <h5>Select States to Include In Chart</h5>

                {/* <pre>{JSON.stringify(this.props.multiSelectedStatesIdsArr.map(obj => obj.stateabbreviation))}</pre> */}
                <MultiSelect
                  options={dropdownOptions}
                  value={this.props.multiSelectedStatesIdsArr}
                  onChange={this.props.setMultiSelectedStates}
                  labelledBy={"Select"}
                  hasSelectAll
                  overrideStrings={{ 
                    "selectSomeItems": "Select States",
                    "allItemsAreSelected": "All States",
                    "selectAll": "Select/Clear All",
                    "search": "Search"
                  }}
                />
<br />
            {dateRangePicker()}
            {/* {this.legendPayload(chartData)} */}
            <ResponsiveContainer width="95%" height={300}>                        
            <LineChart  data={chartData}  
              margin={{ top: 5, right: 1, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis   />
              <Tooltip offset={60} itemStyle={tooltipStyle} />
              {/* <ReferenceLine x="03/23" stroke="green" label="Min PAGE" /> */}
              {/* {stayAtHomeOrderXReferences} */}
              {/* <Legend onClick={this.handleLegendClick} iconType="plainline"  iconSize={30} /> */}
              <Legend payload={legendPayload}    iconType="plainline"  iconSize={30}  />
            

              {/* isAnimationActive={false} */}

              {this.props.includeGridLines.includeNegatives ? <Line animationDuration={400} dot={false}   dataKey="Negative" strokeWidth={width["Negative"]} stroke={this.state.colors.negative}   /> :null }
              {this.props.includeGridLines.includeTested ? <Line animationDuration={400}  dot={false}   dataKey="Tested" strokeWidth={width["Tested"]} stroke={this.state.colors.tested}/> :null }
              {this.props.includeGridLines.includePositives ? <Line animationDuration={400}  dot={false}   dataKey="Positive" strokeWidth={width["Positive"]} stroke={this.state.colors.positive}   /> :null }
              {this.props.includeGridLines.includeHospitalized ? <Line animationDuration={400}  dot={false}   dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke={this.state.colors.hospitalized}   /> :null }
              {this.props.includeGridLines.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths" strokeWidth={width["Deaths"]}  stroke={this.state.colors.death}   /> :null }
              { this.props.includeGridLines.includePositivePercent ? (!!multiStateChartDataSet && multiStateChartDataSet[0]["count_type"].startsWith("new")) ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive %" strokeWidth={width["Positive %"]} stroke={this.state.colors.positivePercent}    /> : null : null}
              
              { this.props.includeGridLines.includeTested ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Total-avg" strokeWidth={2} stroke={this.state.colors.total}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeNegatives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Negative-avg" strokeWidth={2} stroke={this.state.colors.negative}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includePositives ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Positive-avg" strokeWidth={2} stroke={this.state.colors.positive}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeHospitalized ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Hospitalized-avg" strokeWidth={2} stroke={this.state.colors.hospitalized}   strokeDasharray="3 3" /> : null}
              { this.props.includeGridLines.includeDeaths ? <Line animationDuration={400} dot={false} type="monotone"  dataKey="Deaths-avg" strokeWidth={2} stroke={this.state.colors.death}   strokeDasharray="3 3" /> : null}
              
              

            </LineChart>
            </ResponsiveContainer>                        
          </>
          ) // ends "singleStateChart" RETURN




      // case "rateOfGrowthChart":
      //   let chartMax = 100
      //   let chartMin = -100
    //     if (singleStateChartDataSet.length > 0 ) {
    //       //This checks to see if its for the WHOLE US or not

    //       for ( let date1 of this.state.displayDates) { chartData.push({date: getMonthDayFromYYYYMMDD(date1)})}

    // /// Averaging-out logic Starts here
    //         let tempRoGAveragesData = []
    //         let dates = Object.keys(top10sDataSet[0]).filter( k => k.startsWith("2020"))
    //         formattedGridLinesArr.forEach( function(obj) {
              
    //           let tempObj = {...obj}
    //           sevenDayAverageCalculator(obj, tempObj, dates)
    //         tempRoGAveragesData.push(tempObj)
    //       })  // Ends forEach to geet average of all values
    //       formattedGridLinesArr = [...tempRoGAveragesData]
    // /// Averaging-out logic Stops here

    //       chartData.forEach((dataObject, index) => 
    //       formattedGridLinesArr.forEach(stateTypeObj =>              
    //           {if (index === 0) {
    //             dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = null
    //           } else {
    //             //if yesterday's AND today's numbers were NOT 0 or null   ---- IDEAL
    //             if (!!stateTypeObj[this.state.displayDates[index]] && !!stateTypeObj[this.state.displayDates[index -1 ]] ) {
    //               dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = ((stateTypeObj[this.state.displayDates[index]] - stateTypeObj[this.state.displayDates[index - 1]] ) / stateTypeObj[this.state.displayDates[index - 1]]) *100
    //             } else if (!stateTypeObj[this.state.displayDates[index]]) {
    //               dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = 0
    //             } else if (!stateTypeObj[this.state.displayDates[index - 1]]) {
    //               dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = stateTypeObj[this.state.displayDates[index]]
    //             }
    //             if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] > chartMax) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMax}
    //             if (dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] < chartMin) {dataObject[mapCountTypeToHumanReadableType(stateTypeObj["count_type"])] = chartMin}
    //           }} //Closes Original IF
    //         )
    //       )
    //     } // ends GridLines IF statements

        // function gridTooltipValFormatter(value, name) {
        //   if (value === chartMax) {
        //     return `>${value.toFixed(2)}%`
        //   } else if (value === chartMin) {
        //       return `<${value.toFixed(2)}%`
        //   }else {
        //       return `${value.toFixed(2)}%`
        //   }
        // }  

        // return( 
        //   <>
        //   {dateRangePicker()}
        //   <ResponsiveContainer width="90%" height={300}>                        
        //   <LineChart  data={chartData}
        //     margin={{ top: 5, right: 1, left: 10, bottom: 5 }}>
        //     <CartesianGrid strokeDasharray="3 3" />
        //     {/* <CartesianAxis tickLine="false"     /> */}
        //     <XAxis dataKey="date" />
        //     <YAxis tickFormatter={this.formatYAxisForRateOfGrowth}>
        //       <Label angle={-90} position='insideBottomLeft' >{this.yLabel()}</Label>
        //     </YAxis>
        //     <Tooltip  
        //     formatter={gridTooltipValFormatter}
        //     labelFormatter={(value) => `RoG for ${value}` }
        //     offset={60} itemStyle={tooltipStyle} nMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} iconSize={30}/>
        //     <Legend onClick={this.handleLegendClick} iconType="wye"  />
        //     {this.props.includeGridLines.includeNegatives ? <Line type="monotone" dot={false} dataKey="Negative" strokeWidth={width["Negative"]} stroke="blue"   /> :null }
        //     {this.props.includeGridLines.includeTested ? <Line type="monotone" dot={false} dataKey="Tested" strokeWidth={width["Tested"]} stroke={this.state.colors.tested}/> :null }
        //     {this.props.includeGridLines.includePositives ? <Line type="monotone" dot={false} dataKey="Positive" strokeWidth={width["Positive"]} stroke="red"   /> :null }
        //     {this.props.includeGridLines.includeHospitalized ? <Line type="monotone" dot={false} dataKey="Hospitalized" strokeWidth={width["Hospitalized"]} stroke={this.state.colors.hospitalized}   /> :null }
        //     {this.props.includeGridLines.includeDeaths ?  <Line type="monotone" dot={false} dataKey="Deaths" strokeWidth={width["Deaths"]} stroke={this.state.colors.death}   /> :null }
            
        //   </LineChart>
        //   </ResponsiveContainer>       
        //   </>                 
        // ) // ends "RatesOfGrowth" RETURN
     

      default:
        break
    } // ends switch
  }
}  // ends ChartBuilder class

function mdp(dispatch) {
  return { 
    fetchAllStatesData: (countOfDays, fromToDatesValue) => dispatch(fetchAllStatesData(countOfDays, fromToDatesValue)),
    setMultiSelectedStates: (one, two) => dispatch(setMultiSelectedStates(one, two)),

  }
}

// this comes from reduct.js - K is local reference, V is foreign state attribute
function msp(state) {
  return { 
    staticDatesArr: state.staticDatesArr,
    fromToDatesValue: state.fromToDatesValue,
    newPositive: state.newPositive,
    newNegative: state.newNegative,
    newPositivePercent: state.newPositivePercent,
    newDeath: state.newDeath,
    newTotal: state.newTotal,
    newHospitalized: state.newHospitalized,
    totalPositive: state.totalPositive,
    totalNegative: state.totalNegative,
    totalDeath: state.totalDeath,
    totalTotal: state.totalTotal,
    totalHospitalized: state.totalHospitalized,
    newOrTotal: state.newOrTotal,
    includeGridLines: state.includeGridLines,
    idOfStateInSingleStateGrid: state.idOfStateInSingleStateGrid,
    selectedStatType: state.selectedStatType,
    multiSelectedStatesIdsArr: state.multiSelectedStatesIdsArr

  }
}

export default connect(msp, mdp)(ChartBuilder)
