import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { SURFACE, HIGH_EMPHASIS } from "../../constants/theme"
import useKeyPress from "../../hooks/useKeyPress"
import { BASE } from "./constants"
import { Wrapper } from "../wiki/Wiki"
import {
  getInputValue,
  setInputValue,
  checkForContent,
  formatNumberOrString,
  downloadData,
  formatForWiki,
} from "./utils"
import { apiUrl } from "../../constants/urls"
import { useUser } from "../../contexts/UserContext"
import { useWiki } from "../../contexts/WikiContext"
import { create, update } from "../api/api"

const CASES_ID = "5e16390e2ccc7c00081360e4"

const ErrorMessage = styled.p`
  color: red;
  font-weight: 800;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${SURFACE};
  padding: 1rem;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    opacity: ${HIGH_EMPHASIS};
  }
  label {
    display: block;
  }
`

const CaseWrapper = styled(Wrapper)`
  margin-bottom: 1rem;
`

const SubSection = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid white;
  margin-bottom: 1rem;
`

const Label = styled.label`
  color: #bbbbbb;
  margin: 0.5rem 0 0.2rem;
  :first-child {
    margin: 0rem 0 0.2rem;
  }
  :hover {
    font-weight: bold;
    cursor: pointer;
    border-right: 1px solid white;
  }
`

const Title = styled.h2`
  font-size: medium;
  margin: 0;
  border-bottom: 1px solid white;
  :hover {
    color: orange;
    cursor: pointer;
  }
`

const InnerInput = styled.input`
  width: 100%;
  padding: 0.5rem;
`
const InnerTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  min-height: 6rem;
`
const InfoWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 0rem;
`
const Strong = styled.strong`
  color: orange;
`
const ContainedButton = styled.button`
  background-color: black;
  color: white;
  padding: 1rem;
  border: none;
  flex-grow: 1;
  margin: 0 0.5rem 0 0;
  :only-child {
    margin: 0;
  }
  :last-child {
    margin: 0;
  }
`
const ButtonWrapper = styled.div`
  margin: 0.5rem 0;
  display: flex;
`

const Input = ({ label, description, type = "text", value, onChange }) => (
  <>
    <Label>{label}</Label>
    <InnerInput
      className="case-input"
      type={type}
      value={value && value.value}
      placeholder={description}
      onChange={onChange}
    />
  </>
)

const TextArea = ({ label, description, value, onChange }) => (
  <>
    <Label>{label}</Label>
    <InnerTextArea
      placeholder={description}
      className="case-input"
      value={value && value.value}
      onChange={onChange}
    />
  </>
)

const InfoBox = ({ title, data, setInputIndex }) => {
  const [show, setShow] = useState(true)
  if (!data) return null
  const entries = data && Object.entries(data)
  const entryFound = Object.values(data).findIndex(d => d) !== -1
  return entryFound ? (
    <InfoWrapper>
      <Title onClick={() => setShow(!show)}>{title}</Title>
      {show &&
        entries &&
        entries.map(
          ([key, entry]) =>
            entry && (
              <Label onClick={() => setInputIndex([entry.index])}>
                {key}: <Strong>{formatNumberOrString(entry.value)}</Strong>
              </Label>
            )
        )}
    </InfoWrapper>
  ) : null
}

const Case = ({ theme = "Grey" }) => {
  const { user, setPage } = useUser()
  const { wikiEntries, setWikiEntries } = useWiki()
  const enterPress = useKeyPress("Enter")
  const backspacePress = useKeyPress("Backspace")
  const [errorMessage, setErrorMessage] = useState("")
  const [inputIndex, setInputIndex] = useState([0])
  const [showSave, setShowSave] = useState(false)

  const [baseInfo, setBaseInfo] = useState(undefined)
  const [baseValues, setBaseValues] = useState(undefined)
  const [baseValuation, setBaseValuation] = useState(undefined)
  const [productAndMarket, setProductAndMarket] = useState(undefined)
  const [people, setPeople] = useState(undefined)
  const [financialAnalysis, setFinancialAnalysis] = useState(undefined)
  const [macro, setMacro] = useState(undefined)
  const [portfolioFit, setPortfolioFit] = useState(undefined)

  const allInfo = {
    "Base information": { get: baseInfo, set: setBaseInfo },
    Pricing: { get: baseValues, set: setBaseValues },
    Valuation: { get: baseValuation, set: setBaseValuation },
    "Product & Market": { get: productAndMarket, set: setProductAndMarket },
    People: { get: people, set: setPeople },
    "Financial Analysis": { get: financialAnalysis, set: setFinancialAnalysis },
    Macro: { get: macro, set: setMacro },
    "Portfolio-fit": { get: portfolioFit, set: setPortfolioFit },
  }

  useEffect(() => {
    if (!enterPress) return
    if (inputIndex[0] > BASE.length - 1) {
      return
    }
    setInputIndex([inputIndex[0] + 1])
  }, [enterPress])

  useEffect(() => {
    if (!backspacePress) return
    if (inputIndex[0] === 0) {
      return
    }
    const elements = document.getElementsByClassName("case-input")
    if (!elements.length) {
      setInputIndex([inputIndex[0] - 1])
      return
    }
    if (elements[0].value.length) {
      return
    }
    setTimeout(() => {
      if (elements[0].value.length) {
        return
      }
      setInputIndex([inputIndex[0] - 1])
    }, 700)
  }, [backspacePress])

  useEffect(() => {
    setTimeout(() => {
      const elements = document.getElementsByClassName("case-input")
      if (!elements.length) {
        console.log(elements)
        return
      }
      elements[0].focus()
    }, 100)
  }, [inputIndex])

  return (
    <Container>
      <h1>Case builder</h1>
      <CaseWrapper theme={theme}>
        {checkForContent(allInfo) && (
          <InfoWrapper>
            <Label>
              This is the case builder, fill in the necessary information below
              to build an investment case.
            </Label>
          </InfoWrapper>
        )}
        {Object.entries(allInfo).map(
          ([key, value]) =>
            value.get && (
              <InfoBox
                title={key}
                data={value.get}
                setInputIndex={setInputIndex}
              />
            )
        )}
      </CaseWrapper>

      <SubSection>
        {BASE.map((b, i) => ({ ...b, index: i })).map((b, i) => {
          if (inputIndex.includes(i) && b.type === "textarea") {
            return (
              <TextArea
                label={b.label}
                description={b.description}
                value={getInputValue(b, allInfo)}
                onChange={e => setInputValue(b, allInfo, e)}
              />
            )
          } else if (inputIndex.includes(i)) {
            return (
              inputIndex.includes(i) && (
                <Input
                  label={b.label}
                  description={b.description}
                  type={b.type}
                  value={getInputValue(b, allInfo)}
                  onChange={e => setInputValue(b, allInfo, e)}
                />
              )
            )
          }
        })}
        <ButtonWrapper>
          {inputIndex[0] !== 0 && (
            <ContainedButton onClick={() => setInputIndex([inputIndex[0] - 1])}>
              Go back
            </ContainedButton>
          )}
          {inputIndex[0] < BASE.length - 1 && (
            <ContainedButton onClick={() => setInputIndex([inputIndex[0] + 1])}>
              Next
            </ContainedButton>
          )}
        </ButtonWrapper>
        {Object.values(allInfo).some(x => x.get) && (
          <ButtonWrapper>
            <ContainedButton onClick={() => setShowSave(!showSave)}>
              {showSave ? "Cancel" : "Save"}
            </ContainedButton>
            {showSave && (
              <>
                <ContainedButton
                  onClick={() => {
                    const data = wikiEntries.find(
                      entry => entry._id === CASES_ID
                    )
                    const newItem = {
                      ...formatForWiki(allInfo),
                      createdBy: { name: user.username, email: user.email },
                    }
                    create(`${apiUrl}/wikis`, newItem, "Unauthorized").then(
                      response => {
                        console.log("Create response: ", response)
                        if (response.error) {
                          console.error(
                            "Create request failed with: ",
                            response.error
                          )
                          setErrorMessage("Create request failed, try again...")
                          return
                        }
                        setErrorMessage("")
                        const createdData = {
                          ...response.created,
                          createdAt: new Date().toUTCString(),
                        }
                        const { _id, ...dataProps } = data
                        const newChildren = [
                          ...(dataProps.children || []),
                          response.created._id,
                        ]
                        const updateData = {
                          ...dataProps,
                          children: newChildren,
                        }
                        createdData &&
                          setWikiEntries([...wikiEntries, createdData])
                        update(
                          `${apiUrl}/wikis/${_id}`,
                          updateData,
                          "Unauthorized"
                        ).then(response => {
                          console.log("Update response: ", response)
                          if (response.error) {
                            console.error(
                              "Update request failed with: ",
                              response.error
                            )
                            setErrorMessage(
                              `Item created successfully but update request for parent failed... Go to ${data.title} and add this child manually in the editor.`
                            )
                            return
                          }
                          setErrorMessage("")
                          const index = wikiEntries.findIndex(
                            entry => entry._id === _id
                          )
                          const newWikiEntries = [...wikiEntries, createdData]
                          const updatedData = {
                            _id,
                            ...updateData,
                          }
                          newWikiEntries[index] = updatedData
                          parent.title === data.title &&
                            setWikiEntries(newWikiEntries)
                          setPage("wiki")
                        })
                      }
                    )
                  }}
                >
                  Save to Wiki
                </ContainedButton>
                <ContainedButton
                  onClick={() =>
                    downloadData({ data: allInfo, fileName: "backup-case" })
                  }
                >
                  Save to file
                </ContainedButton>
              </>
            )}
          </ButtonWrapper>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SubSection>
    </Container>
  )
}

export default Case
