import { SET_WIKI_ENTRIES, CLEAR_WIKI_ENTRIES } from "../constants/context"
import { combineReducer } from "./combineReducer"

const wikiEntries = (state = [], action) => {
  switch (action.type) {
    case SET_WIKI_ENTRIES:
      return action.payload
    case CLEAR_WIKI_ENTRIES:
      return []
    default:
      return state
  }
}

export default combineReducer({
  wikiEntries,
})
