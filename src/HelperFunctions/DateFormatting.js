
const getMonthDayFromYYYYMMDD = (YYYYMMDDint) => {
  if (YYYYMMDDint) {
    let reformat1 = YYYYMMDDint.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') 
    // Create a date object from the timestamp
    let [ year, month, day ] = reformat1.split("-")
  
    // Create a list of names for the months
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',	'Nov', 'Dec'];
  
    // return a formatted date
    return months[parseInt(month) -1 ] + " " + day;
  }
};


const mapStateIdToStateAbbreviation = (id) => {
  switch (id) {
    case 56: return "MP"

    default: return "Correct State Name switch  case in HelperFunctions/mappingIDtoSomething.js"
  } // ends switch/case 
} // ends mapStateIdToStateAbbreviation function





export { 
  getMonthDayFromYYYYMMDD  }