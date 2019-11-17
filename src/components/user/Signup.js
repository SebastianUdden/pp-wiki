import React, { useRef, useState } from "react"
import { useUser } from "../../contexts/UserContext"
import Input from "../ui/Input"
import {
  FieldHint,
  Wrapper,
  ErrorMessage,
  Button,
  Em,
  FlexWrapper,
} from "./common"
import { ERROR, ON_ERROR } from "../../constants/theme"
import Modal from "../ui/Modal"
import { create, get } from "../api/api"
import { apiUrl } from "../../constants/urls"

const validateForm = inputRefs => {
  const results = inputRefs.map(ref => ref.current.validate())
  return !results.filter(result => !result).length
}

const Signup = ({ fields }) => {
  const [signedUp, setSignedUp] = useState(false)
  const [showConfirmRemoval, setShowConfirmRemoval] = useState(false)
  const [showUsernameTaken, setShowUsernameTaken] = useState(false)
  const [showEmailTaken, setShowEmailTaken] = useState(false)
  const [showMatchingPasswordError, setShowMatchingPasswordError] = useState(
    false
  )
  const {
    user,
    setUser,
    tempUser,
    setTempUser,
    setPage,
    clearUser,
    clearTempUser,
  } = useUser()
  const inputRefs = fields.map(useRef)

  return (
    <Wrapper>
      {user.email && user.password && user.loggedIn && (
        <>
          <FieldHint>
            You are already signed up as <Em>{user.username || user.email}</Em>,
            would you like remove the user?
          </FieldHint>{" "}
          {!showConfirmRemoval && (
            <Button onClick={() => setShowConfirmRemoval(true)}>
              Remove account
            </Button>
          )}
          {showConfirmRemoval && (
            <FlexWrapper>
              <Button onClick={() => setShowConfirmRemoval(false)}>
                Cancel
              </Button>
              <Button
                backgroundColor={ERROR}
                color={ON_ERROR}
                onClick={() => {
                  clearUser()
                }}
              >
                Confirm
              </Button>
            </FlexWrapper>
          )}
        </>
      )}
      {!(user.email && user.password && user.loggedIn) && (
        <>
          {fields.map((field, index) => (
            <Input
              key={field.fieldName}
              ref={inputRefs[index]}
              section="signup"
              field={field}
              onValue={value => setTempUser(field.fieldName, value)}
            />
          ))}
          {showMatchingPasswordError && (
            <ErrorMessage>
              Passwords are invalid or do not match...
            </ErrorMessage>
          )}
          {showUsernameTaken && (
            <ErrorMessage>Username is already taken...</ErrorMessage>
          )}
          {showEmailTaken && (
            <ErrorMessage>Email is already taken...</ErrorMessage>
          )}
          <Button
            type="submit"
            onClick={() => {
              setShowMatchingPasswordError(
                tempUser.password !== tempUser.repeatPassword
              )
              const signUp = validateForm(inputRefs)
              if (signUp && tempUser.password === tempUser.repeatPassword) {
                get(`${apiUrl}/users`, "Unauthorized").then(users => {
                  setShowUsernameTaken(
                    tempUser.username !== "" &&
                      users.some(user => user.username === tempUser.username)
                  )
                  setShowEmailTaken(
                    users.some(user => user.email === tempUser.email)
                  )
                  if (showUsernameTaken || showEmailTaken) return
                  create(`${apiUrl}/users`, tempUser).then(response => {
                    localStorage.setItem("email", tempUser.email)
                    localStorage.setItem("username", tempUser.username)
                    localStorage.setItem("password", tempUser.password)
                    setSignedUp(signUp)
                  })
                })
              }
            }}
          >
            Sign up
          </Button>
          {signedUp && (
            <Modal
              title="Would you like to save your password locally?"
              description="It's possible to remove the user to remove the saved password later."
              onConfirm={() => {
                localStorage.setItem("auto-password", true)
                setUser({ ...tempUser, password: "" })
                clearTempUser()
                setPage("login")
              }}
              onDeny={() => {
                localStorage.setItem("auto-password", false)
                setUser(tempUser)
                clearTempUser()
                setPage("login")
              }}
            />
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Signup
