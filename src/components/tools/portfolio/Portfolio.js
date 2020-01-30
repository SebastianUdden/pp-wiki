import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Wrapper } from "../../common"
import {
  DP6,
  MAIN_THEME,
  ON_BACKGROUND,
  BACKGROUND,
  BACKGROUND_ACTIVE,
} from "../../../constants/theme"
import { MEDIA_MAX_MEDIUM } from "../../../constants/sizes"
import DonutChart from "./Donut"
import Input from "../../ui/InputUI"

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

const Button = styled.button`
  padding: 1rem;
  border: none;
  margin: 0.3rem auto;
  background-color: ${p =>
    p.active ? MAIN_THEME.PRIMARY_DARK.color.background : BACKGROUND};
  color: ${ON_BACKGROUND};
  width: 100%;
  text-transform: uppercase;
  box-shadow: ${DP6};
  outline: none;
  cursor: pointer;
  :hover {
    background-color: ${p =>
      p.active ? MAIN_THEME.PRIMARY_DARK.color.background : BACKGROUND_ACTIVE};
  }
  :active {
    background-color: ${MAIN_THEME.PRIMARY_DARK.color.background};
  }
`

const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "magenta",
]

const Portfolio = ({}) => {
  const [portfolioAssets, setPortfolioAssets] = useState([])
  const [assetName, setAssetName] = useState("")
  const [investmentSize, setInvestmentSize] = useState(0)
  const [totalInvested, setTotalInvested] = useState(0)

  useEffect(() => {
    setTotalInvested(portfolioAssets.reduce((a, b) => a + b.investmentSize, 0))
  }, [portfolioAssets])

  return (
    <Wrapper>
      <h1>Portfolio</h1>
      <Input
        type="text"
        label="Asset name"
        value={assetName}
        onChange={e => setAssetName(e.target.value)}
      />
      <Input
        type="number"
        label="Investment size (SEK)"
        min={0}
        value={investmentSize}
        onChange={e => setInvestmentSize(parseInt(e.target.value))}
      />
      <Button
        onClick={() => {
          setPortfolioAssets([
            ...portfolioAssets,
            {
              title: assetName,
              investmentSize,
              color: COLORS[portfolioAssets.length],
            },
          ])
        }}
      >
        Add asset
      </Button>
      <FlexWrapper>
        <Column>
          <h3>Invested: {totalInvested}</h3>
          <DonutChart
            color="#aaaaaa11"
            values={portfolioAssets}
            percentageValue="investmentSize"
          />
        </Column>
      </FlexWrapper>
    </Wrapper>
  )
}

export default Portfolio
