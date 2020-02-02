import React, { useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../common"
import Input from "../ui/InputUIClassic"
import {
  SVG,
  done,
  block,
  create,
  exitToApp,
  deleteTrashcanForever,
  saveAlt,
  deleteTrashcan,
} from "project-pillow-components"
import { Button as ButtonUI } from "../common"
import { downloadData } from "../tools/case/utils"
import { useWiki } from "../../contexts/WikiContext"
import { useUser } from "../../contexts/UserContext"

const Container = styled.div`
  margin: 0;
`

const Label = styled.label`
  color: #bbbbbb;
  font-size: small;
  margin: 0;
`

const Heading = styled.h2`
  margin: none;
  margin-top: -0.7rem;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  margin-right: 0.5rem;
  min-height: 3rem;
  margin-bottom: -0rem;
`

const Value = styled.span`
  width: 100%;
`

const Icon = styled.span`
  cursor: pointer;
  margin-left: 0.5rem;
  :last-child {
    margin-left: 0.1rem;
  }
`

const ButtonText = styled.span`
  margin-left: 0.5rem;
  font-size: small;
`

const DescriptiveText = styled(Label)`
  margin-left: 0.2rem;
`

const ButtonAndLabel = styled.div`
  margin: 1rem 0;
`

const Buttons = styled.div`
  display: flex;
`

const Button = styled(ButtonUI)`
  margin-right: 0.3rem;
  /* background-color: ${p => p.color || "#010101"}; */
`

const EditableField = ({ label, fieldValue, type, onChange }) => {
  const [edit, setEdit] = useState(false)

  return (
    <Container>
      <Label>{label}</Label>
      <Heading>
        {edit ? (
          <Input value={fieldValue} onChange={onChange} />
        ) : (
          <Value>{type === "password" ? "******" : fieldValue}</Value>
        )}
        {!edit && (
          <Icon onClick={() => setEdit(!edit)}>
            <SVG {...create} size="1.4rem" />
          </Icon>
        )}
        {edit && (
          <>
            <Icon onClick={() => setEdit(!edit)}>
              <SVG {...block} />
            </Icon>
            <Icon onClick={() => setEdit(!edit)}>
              <SVG {...done} />
            </Icon>
          </>
        )}
      </Heading>
    </Container>
  )
}

const ButtonLogic = ({ type }) => {
  const { wikiEntries } = useWiki()
  const { user, setUser, clearTempUser, setPage } = useUser()
  const [showConfirmAction, setShowConfirmAction] = useState(false)

  return (
    <>
      {type === "signOut" && (
        <ButtonAndLabel>
          <Buttons>
            <Button onClick={() => setShowConfirmAction(!showConfirmAction)}>
              <SVG {...exitToApp} size="1rem" />
              <ButtonText>Sign out</ButtonText>
            </Button>
            {showConfirmAction && (
              <>
                <Button
                  backgroundColor="#1a1a1a"
                  onClick={() => setShowConfirmAction(false)}
                >
                  <SVG {...block} size="1rem" />
                </Button>
                <Button
                  backgroundColor="#1a4a1a"
                  onClick={() => {
                    setShowConfirmAction(false)
                    Object.keys(user).forEach(key => {
                      key !== "repeatPassword" &&
                        localStorage.setItem(key, user[key])
                    })
                    localStorage.setItem("loggedIn", false)
                    setUser({ ...user, loggedIn: false })
                    clearTempUser()
                    setPage("login")
                  }}
                >
                  <SVG {...done} size="1rem" />
                </Button>
              </>
            )}
          </Buttons>
          <DescriptiveText>Sign out from your account</DescriptiveText>
        </ButtonAndLabel>
      )}
      {type === "removeAccount" && (
        <ButtonAndLabel>
          <Buttons>
            <Button onClick={() => setShowConfirmAction(!showConfirmAction)}>
              <SVG {...deleteTrashcanForever} size="1rem" />
              <ButtonText>Remove account</ButtonText>
            </Button>
            {showConfirmAction && (
              <>
                <Button
                  backgroundColor="#1a1a1a"
                  onClick={() => setShowConfirmAction(false)}
                >
                  <SVG {...block} size="1rem" />
                </Button>
                <Button
                  backgroundColor="#4a1a1a"
                  onClick={() => {
                    setShowConfirmAction(false)
                    location.href =
                      "https://i.ytimg.com/vi/g_vZasFzMN4/hqdefault.jpg"
                  }}
                >
                  <SVG {...deleteTrashcan} size="1rem" />
                </Button>
              </>
            )}
          </Buttons>
          <DescriptiveText>
            The permanently removes your account
          </DescriptiveText>
        </ButtonAndLabel>
      )}
      {type === "backupWiki" && (
        <ButtonAndLabel>
          <Buttons>
            <Button onClick={() => setShowConfirmAction(!showConfirmAction)}>
              <SVG {...saveAlt} size="1rem" />
              <ButtonText>Backup wiki</ButtonText>
            </Button>
            {showConfirmAction && (
              <>
                <Button
                  backgroundColor="#1a1a1a"
                  onClick={() => setShowConfirmAction(false)}
                >
                  <SVG {...block} size="1rem" />
                </Button>
                <Button
                  backgroundColor="#1a4a1a"
                  onClick={() => {
                    setShowConfirmAction(false)
                    downloadData({ data: wikiEntries })
                  }}
                >
                  <SVG {...saveAlt} size="1rem" />
                </Button>
              </>
            )}
          </Buttons>
          <DescriptiveText>Backup wiki data as JSON-file</DescriptiveText>
        </ButtonAndLabel>
      )}
    </>
  )
}

const Profile = ({}) => {
  const { user } = useUser()
  const [name, setName] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)

  return (
    <Wrapper theme="Grey">
      <EditableField
        label="Name"
        fieldValue={name}
        onChange={e => setName(e.target.value)}
      />
      <EditableField
        label="E-mail"
        fieldValue={email}
        onChange={e => setEmail(e.target.value)}
      />
      <EditableField
        label="Password"
        type="password"
        fieldValue={password}
        onChange={e => setPassword(e.target.value)}
      />
      <ButtonLogic type="signOut" />
      <ButtonLogic type="removeAccount" />
      <ButtonLogic type="backupWiki" />
    </Wrapper>
  )
}

export default Profile
