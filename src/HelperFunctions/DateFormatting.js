
const getMonthDayFromYYYYMMDD = (YYYYMMDDint) => {
  if (YYYYMMDDint) {
    let reformat1 = YYYYMMDDint.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') 
    // Create a date object from the timestamp
    let [ , month, day ] = reformat1.split("-")
  
    // Create a list of names for the months
    // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',	'Nov', 'Dec'];
  
    // return a formatted date
    // return months[parseInt(month) -1 ] + " " + day;
    return month + "/" + day;
  }
};

const getDashSeperatedInDATEFormatFromYYYYMMDD = (YYYYMMDDint) => {
  if (YYYYMMDDint) {
    return new Date(YYYYMMDDint.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') )
    ;
  }
};

const getDashSeperatedDateFromYYYYMMDD = (YYYYMMDDint) => {
  if (YYYYMMDDint) {
    return YYYYMMDDint.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    ;
  }
};

function getYYYYMMDDfromFormattedDate(d) {
  let month, day, year, newDate
  if (d instanceof Date) {
      month = d.getMonth()+1
      month = month.toString()
      day = d.getDate().toString()
      year = d.getFullYear().toString()

    if (month.length < 2) {month = "0" + month}
    if (day.length < 2) {day = "0" + day}
        

    newDate = parseInt([year, month, day].join(""))
    return newDate;
  }
}


// const mapStateIdToStateAbbreviation = (id) => {
//   switch (id) {
//     case 56: return "MP"

//     default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
//   } // ends switch/case 
// } // ends mapStateIdToStateAbbreviation function





export { 
  getMonthDayFromYYYYMMDD, 
  getDashSeperatedInDATEFormatFromYYYYMMDD, 
  getDashSeperatedDateFromYYYYMMDD,
  getYYYYMMDDfromFormattedDate  
}