import React, { useReducer, createContext, useContext } from "react"
import userReducer from "../reducers/userReducer"
import {
  SET_USER,
  SET_USERS,
  CLEAR_USER,
  SET_PAGE,
  CLEAR_TEMP_USER,
  SET_TEMP_USER,
} from "../constants/context"

const initialState = {
  user: {},
  users: [],
  tempUser: {},
  page: "tools",
  clearUser: () => {},
  clearTempUser: () => {},
  setUser: () => {},
  setUsers: () => {},
  setTempUser: () => {},
  setPage: () => {},
}

const UserContext = createContext(initialState)
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const clearUser = () =>
    dispatch({
      type: CLEAR_USER,
      payload: {},
    })
  const clearTempUser = () =>
    dispatch({
      type: CLEAR_TEMP_USER,
      payload: {},
    })
  const setUser = user =>
    dispatch({
      type: SET_USER,
      payload: user,
    })
  const setUsers = users =>
    dispatch({
      type: SET_USERS,
      payload: users,
    })
  const setTempUser = (fieldName, fieldValue) =>
    dispatch({
      type: SET_TEMP_USER,
      payload: { fieldName, fieldValue },
    })

  const setPage = page =>
    dispatch({
      type: SET_PAGE,
      payload: page,
    })

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setUsers,
        setTempUser,
        clearUser,
        clearTempUser,
        setPage,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
