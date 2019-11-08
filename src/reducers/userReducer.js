import {
  SET_USER,
  SET_PAGE,
  CLEAR_USER,
  SET_TEMP_USER,
  CLEAR_TEMP_USER,
} from "../constants/context"

import { combineReducer } from "./combineReducer"

const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case CLEAR_USER:
      localStorage.clear()
      return {}
    default:
      return state
  }
}

const tempUser = (state = [], action) => {
  switch (action.type) {
    case SET_TEMP_USER:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.fieldValue,
      }
    case CLEAR_TEMP_USER:
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}

const page = (state = [], action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.payload
    default:
      return state
  }
}

export default combineReducer({
  user,
  tempUser,
  page,
})
