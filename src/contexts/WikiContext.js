import React, { useReducer, createContext, useContext } from "react"
import wikiReducer from "../reducers/wikiReducer"
import { CLEAR_WIKI_ENTRIES, SET_WIKI_ENTRIES } from "../constants/context"

const initialState = {
  wikiEntries: [],
}

const WikiContext = createContext(initialState)
export const useWiki = () => useContext(WikiContext)

export const WikiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wikiReducer, initialState)

  const setWikiEntries = wiki =>
    dispatch({
      type: SET_WIKI_ENTRIES,
      payload: wiki,
    })
  const clearWikiEntries = () =>
    dispatch({
      type: CLEAR_WIKI_ENTRIES,
      payload: [],
    })

  return (
    <WikiContext.Provider
      value={{
        ...state,
        setWikiEntries,
        clearWikiEntries,
      }}
    >
      {children}
    </WikiContext.Provider>
  )
}
