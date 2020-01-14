import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { useUser } from "../../contexts/UserContext"
import { PRIMARY, SURFACE, HIGH_EMPHASIS } from "../../constants/theme"
import useKeyPress from "../../hooks/useKeyPress"

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
  margin-bottom: 2rem;
`
const Strong = styled.strong`
  color: orange;
`
const ContainedButton = styled.button`
  background-color: black;
  color: white;
  padding: 1rem;
  margin: 0 0.5rem 0 0;
  border: none;
`
const ButtonWrapper = styled.div`
  margin: 0.5rem 0;
`

const Input = ({ label, type = "text", value, onChange }) => (
  <>
    <Label>{label}</Label>
    <InnerInput
      type={type}
      value={value}
      placeholder={label}
      onChange={onChange}
    />
  </>
)

const TextArea = ({ label }) => (
  <>
    <Label>{label}</Label>
    <InnerTextArea placeholder={label} />
  </>
)

const CurrentInformation = data => {
  if (!data) return null
  const keyArray = data && data.baseInfo && Object.keys(data.baseInfo)
  return (
    <InfoWrapper>
      {keyArray &&
        keyArray.sort().map(key => (
          <Label>
            {key}: <Strong>{data.baseInfo[key]}</Strong>
          </Label>
        ))}
    </InfoWrapper>
  )
}

const Case = () => {
  const { user, setPage } = useUser()
  const enterPress = useKeyPress("Enter")
  const [baseInfo, setBaseInfo] = useState(undefined)
  const [inputIndex, setInputIndex] = useState([0])

  useEffect(() => {
    if (!enterPress || inputIndex[0] > 3) return
    setInputIndex([inputIndex[0] + 1])
  }, [enterPress])

  return (
    <Wrapper>
      <h1>Case builder</h1>
      <p>
        This is the case builder, fill in the necessary information below to
        build an investment case.
      </p>
      <h2>Step 1: Base information</h2>
      <SubSection>
        {inputIndex.includes(0) && (
          <Input
            label="Line of business"
            value={baseInfo ? baseInfo["Line of business"] : ""}
            onChange={e =>
              setBaseInfo({ ...baseInfo, "Line of business": e.target.value })
            }
          />
        )}
        {inputIndex.includes(1) && (
          <Input
            label="List"
            value={baseInfo ? baseInfo["List"] : ""}
            onChange={e => setBaseInfo({ ...baseInfo, List: e.target.value })}
          />
        )}
        {inputIndex.includes(2) && (
          <Input
            label="Name"
            value={baseInfo ? baseInfo["Name"] : ""}
            onChange={e => setBaseInfo({ ...baseInfo, Name: e.target.value })}
          />
        )}
        {inputIndex.includes(3) && (
          <Input
            label="Sector"
            value={baseInfo ? baseInfo["Sector"] : ""}
            onChange={e => setBaseInfo({ ...baseInfo, Sector: e.target.value })}
          />
        )}
        {inputIndex.includes(4) && (
          <Input
            label="Ticker"
            value={baseInfo ? baseInfo["Ticker"] : ""}
            onChange={e => setBaseInfo({ ...baseInfo, Ticker: e.target.value })}
          />
        )}
        <ButtonWrapper>
          {inputIndex[0] !== 0 && (
            <ContainedButton onClick={() => setInputIndex([inputIndex[0] - 1])}>
              Go back
            </ContainedButton>
          )}
          {inputIndex[0] < 4 && (
            <ContainedButton onClick={() => setInputIndex([inputIndex[0] + 1])}>
              Next
            </ContainedButton>
          )}
        </ButtonWrapper>
      </SubSection>
      {baseInfo && <CurrentInformation baseInfo={baseInfo} />}

      {/* <SubSection>
        <Input
          label="Market value (MSEK)"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
        <Input
          label="Stock value"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
        <Input
          label="Trade in currency"
          caseData={caseData}
          setCaseData={setCaseData}
        />
      </SubSection>
      <SubSection>
        <Input
          label="P/E"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
        <Input
          label="P/S"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
        <Input
          label="P/B"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
        <Input
          label="Yield"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
      </SubSection>
      <SubSection>
        <Input
          label="Trading volume (SEK)"
          type="number"
          caseData={caseData}
          setCaseData={setCaseData}
        />
      </SubSection>
      <SubSection>
        <TextArea label="Describe the company" setCaseData={setCaseData} />
      </SubSection> */}
      <h2>Step 2: Product and market</h2>
      <h2>Step 3: People</h2>
      <h2>Step 4: Financial analysis</h2>
      <h2>Step 5: Macro</h2>
      <h2>Step 6: Portfolio-fit</h2>
    </Wrapper>
  )
}

export default Case
