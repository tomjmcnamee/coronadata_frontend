import { combineReducers } from 'redux'

let defaultState = {
  formsDropDownOptionsHash: {
  },
    
}




function formsDropDownOptionsReducer(state = defaultState.formsDropDownOptionsHash, action) {
  switch (action.type) {
      case "SET FORM DROPDOWN OPTIONS":
          return action.payload
      default:
          return state
  }
}






let reducer = combineReducers({
  formsDropDownOptionsHash: formsDropDownOptionsReducer,
  
})

export default reducer