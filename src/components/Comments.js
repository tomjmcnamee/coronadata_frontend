import React from 'react'
import AddNewComment from './AddNewComment'

import { getMonthDayFromYYYYMMDD } from '../HelperFunctions/DateFormatting' 


class Comments extends React.Component {

  render () {

    return(
      <>
          <h3>COMMENTS</h3>
      <AddNewComment />
      </>

    ) // ends Return
  } // ends Render

} // ends Comments class
  export default Comments