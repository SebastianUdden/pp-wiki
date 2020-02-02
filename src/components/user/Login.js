import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { useUser } from "../../contexts/UserContext"
import { Em, Wrapper, ErrorMessage, FieldHint } from "./common"
import { Button } from "../common"
import Form from "../ui/Form"
import { get } from "../api/api"
import { apiUrl } from "../../constants/urls"
import useKeyPress from "../../hooks/useKeyPress"

const Mirror = styled.span`
  display: block;
  transform: scale(-1, 1);
  width: auto;
  user-select: none;
`

const Login = ({ fields }) => {
  const [invalidEntry, setInvalidEntry] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const {
    user,
    tempUser,
    setUser,
    setTempUser,
    clearTempUser,
    setPage,
  } = useUser()
  const loginForm = useRef(null)
  const enterPress = useKeyPress("Enter")
  const [loginClick, setLoginClick] = useState(false)
  const [showHands, setShowHands] = useState(false)

  useEffect(() => {
    if (!validForm) return
    get(`${apiUrl}/users`, "Unauthorized").then(users => {
      if (users.error) return
      const matchingUser = users.find(
        u => u.email === tempUser.email && u.password === tempUser.password
      )
      if (matchingUser) {
        Object.keys(matchingUser).forEach(key => {
          key !== "repeatPassword" &&
            localStorage.setItem(key, matchingUser[key])
        })
        localStorage.setItem("loggedIn", true)
        setUser({ ...matchingUser, loggedIn: true })
        setPage("wiki")
        return
      }
      setInvalidEntry(true)
    })
  }, [tempUser, validForm])

  useEffect(() => {
    setLoginClick(enterPress)
    if (!enterPress) return
    setValidForm(loginForm.current.validate())
  }, [enterPress])

  useEffect(() => {
    setShowHands(loginClick && (!validForm || invalidEntry))
  }, [loginClick, validForm])

  return (
    <Wrapper>
      {user.loggedIn && (
        <>
          <FieldHint>
            You are already logged in as <Em>{user.username || user.email}</Em>,
            would you like to log out?
          </FieldHint>
          <Button
            onClick={() => {
              Object.keys(user).forEach(key => {
                key !== "repeatPassword" && localStorage.setItem(key, user[key])
              })
              localStorage.setItem("loggedIn", false)
              setUser({ ...user, loggedIn: false })
              clearTempUser()
            }}
          >
            Log out
          </Button>
        </>
      )}
      {!user.loggedIn && (
        <>
          <Form
            ref={loginForm}
            section="Login"
            formFields={fields.map(field => ({
              ...field,
              value:
                field.fieldName !== "password" ||
                localStorage.getItem("auto-password") === "true"
                  ? localStorage.getItem(field.fieldName)
                  : "",
            }))}
            setFieldValue={setTempUser}
          />
          <Button
            onMouseDown={() => {
              setValidForm(loginForm.current.validate())
              setLoginClick(true)
            }}
            onMouseUp={() => setLoginClick(false)}
            onTouchStart={() => {
              setValidForm(loginForm.current.validate())
              setLoginClick(true)
            }}
            onTouchEnd={() => setLoginClick(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            {showHands && "☝️"}Log in
            {showHands && <Mirror>✋</Mirror>}
          </Button>
          {invalidEntry && (
            <ErrorMessage>
              Invalid email or password... {showHands && "👈"}
            </ErrorMessage>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Login
