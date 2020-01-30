import React, { useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../../common"
import Input from "../../ui/InputUI"
import { DP6 } from "../../../constants/theme"
import { formatWithSpaces, getYearlyResults } from "./utils"
import { MEDIA_MAX_MEDIUM } from "../../../constants/sizes"

const FlexWrapper = styled.div`
  display: flex;
  ${MEDIA_MAX_MEDIUM} {
    flex-direction: column;
  }
`
const Column = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  background-color: #333333;
  box-shadow: ${DP6};
  :last-child {
    flex-grow: 1;
    margin-left: 0.5rem;
  }
  ${MEDIA_MAX_MEDIUM} {
    :last-child {
      margin-left: 0;
      margin-top: 0.5rem;
    }
  }
`
const Results = styled.div``
const Result = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
  color: #999999;
`
const Strong = styled.strong`
  color: orange;
`

const Extrapolator = ({}) => {
  const [deposit, setDeposit] = useState(10000)
  const [monthlyDeposit, setMonthlyDeposit] = useState(3000)
  const [interestRate, setInterestRate] = useState(0)
  const [yearsOfSaving, setYearsOfSaving] = useState(20)

  const yearlyResults = getYearlyResults({
    yearsOfSaving,
    deposit,
    monthlyDeposit,
    interestRate,
  }).map((yr, i) => (
    <Result>
      <span>Y{i + 1}:</span>
      <Strong>{formatWithSpaces(Math.trunc(yr))}</Strong>
    </Result>
  ))

  return (
    <Wrapper>
      <h1>Extrapolator</h1>
      <FlexWrapper>
        <Column>
          <h2>Inputs</h2>
          <Input
            type="number"
            label="Deposit"
            min={0}
            value={deposit}
            onChange={e => setDeposit(parseInt(e.target.value))}
          />
          <Input
            type="number"
            label="Monthly deposit"
            min={0}
            value={monthlyDeposit}
            onChange={e => setMonthlyDeposit(parseInt(e.target.value))}
          />
          <Input
            type="number"
            label="Interest rate"
            min={0}
            max={100}
            value={interestRate}
            onChange={e => setInterestRate(parseInt(e.target.value))}
          />
          <Input
            type="number"
            label="Years of saving"
            min={1}
            value={yearsOfSaving}
            onChange={e => setYearsOfSaving(parseInt(e.target.value))}
          />
        </Column>
        <Column>
          <h2>Results</h2>
          <Results>{yearlyResults}</Results>
        </Column>
      </FlexWrapper>
    </Wrapper>
  )
}

export default Extrapolator
