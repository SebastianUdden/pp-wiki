import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { useUser } from "../../contexts/UserContext"
import { PRIMARY, SURFACE, HIGH_EMPHASIS } from "../../constants/theme"
import useKeyPress from "../../hooks/useKeyPress"
import { BASE } from "./constants"

const Wrapper = styled.div`
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

const SubSection = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid white;
  margin-bottom: 1rem;
`

const Label = styled.label`
  color: #bbbbbb;
  margin: 0.5rem 0 0.2rem;
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
  border: 1px dashed #bbbbbb;
  padding: 1rem;
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
  :first-child {
    margin: 0 0.5rem 0 0;
  }
  :only-child {
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
      value={value()}
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
      value={value()}
      onChange={onChange}
    />
  </>
)

const CurrentInformation = ({ data }) => {
  if (!data) return null
  const entries = data && Object.entries(data)

  return (
    <InfoWrapper>
      {entries &&
        entries.map(([key, value]) => (
          <Label>
            {key}: <Strong>{value}</Strong>
          </Label>
        ))}
    </InfoWrapper>
  )
}

const Case = () => {
  const { user, setPage } = useUser()
  const enterPress = useKeyPress("Enter")
  const [baseInfo, setBaseInfo] = useState(undefined)
  const [baseValues, setBaseValues] = useState(undefined)
  const [baseValuation, setBaseValuation] = useState(undefined)
  const [productAndMarket, setProductAndMarket] = useState(undefined)
  const [inputIndex, setInputIndex] = useState([0])

  useEffect(() => {
    if (!enterPress) return
    if (inputIndex[0] > BASE.length - 1) {
      return
    }
    setInputIndex([inputIndex[0] + 1])
  }, [enterPress])

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
    <Wrapper>
      <h1>Case builder</h1>
      <p>
        This is the case builder, fill in the necessary information below to
        build an investment case.
      </p>
      {baseInfo && <CurrentInformation data={baseInfo} />}
      {baseValues && <CurrentInformation data={baseValues} />}
      {baseValuation && <CurrentInformation data={baseValuation} />}
      {productAndMarket && <CurrentInformation data={productAndMarket} />}
      {inputIndex[0] >= 0 && inputIndex[0] < 13 && (
        <h2>Step 1: Base information</h2>
      )}
      {inputIndex[0] > 12 && inputIndex[0] < 18 && (
        <h2>Step 2: Product and market</h2>
      )}
      {inputIndex[0] > 17 && inputIndex[0] < 20 && <h2>Step 3: People</h2>}

      {/* <h2>Step 4: Financial analysis</h2>
      <h2>Step 5: Macro</h2>
      <h2>Step 6: Portfolio-fit</h2> */}
      <SubSection>
        {BASE.map((b, i) => {
          if (inputIndex.includes(i) && b.type === "textarea") {
            return (
              <TextArea
                label={b.label}
                description={b.description}
                value={() => {
                  if (!b) return
                  if (b.category === "info" && baseInfo) {
                    return baseInfo[b.label]
                  }
                  if (b.category === "values" && baseValues) {
                    return baseValues[b.label]
                  }
                  if (b.category === "valuation" && baseValuation) {
                    return baseValuation[b.label]
                  }
                  if (b.category === "Product & Market" && productAndMarket) {
                    return productAndMarket[b.label]
                  }
                }}
                onChange={e => {
                  if (b.category === "info") {
                    setBaseInfo({ ...baseInfo, [b.label]: e.target.value })
                  }
                  if (b.category === "values") {
                    setBaseValues({ ...baseValues, [b.label]: e.target.value })
                  }
                  if (b.category === "valuation") {
                    setBaseValuation({
                      ...baseValuation,
                      [b.label]: e.target.value,
                    })
                  }
                  if (b.category === "Product & Market") {
                    setProductAndMarket({
                      ...productAndMarket,
                      [b.label]: e.target.value,
                    })
                  }
                }}
              />
            )
          } else if (inputIndex.includes(i)) {
            return (
              inputIndex.includes(i) && (
                <Input
                  label={b.label}
                  description={b.description}
                  type={b.type}
                  value={() => {
                    if (!b) return
                    if (b.category === "info" && baseInfo) {
                      return baseInfo[b.label]
                    }
                    if (b.category === "values" && baseValues) {
                      return baseValues[b.label]
                    }
                    if (b.category === "valuation" && baseValuation) {
                      return baseValuation[b.label]
                    }
                  }}
                  onChange={e => {
                    if (b.category === "info") {
                      setBaseInfo({ ...baseInfo, [b.label]: e.target.value })
                    }
                    if (b.category === "values") {
                      setBaseValues({
                        ...baseValues,
                        [b.label]: e.target.value,
                      })
                    }
                    if (b.category === "valuation") {
                      setBaseValuation({
                        ...baseValuation,
                        [b.label]: e.target.value,
                      })
                    }
                  }}
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
      </SubSection>
    </Wrapper>
  )
}

export default Case
