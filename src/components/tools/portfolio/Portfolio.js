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
import { formatWithSpaces } from "../extrapolator/utils"

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
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }
  :only-child {
    margin: 1rem 0;
  }
`

const ChartWrapper = styled.div`
  max-width: 10rem;
`

const Assets = styled.div`
  margin: 1rem;
`

const Asset = styled.p`
  margin: 0.2rem 0;
  padding: 0.3rem 0.5rem;
  border-left: 1px solid ${p => p.color};
  border-top: 1px dashed ${p => p.color};
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

  const handleDonutChartClick = title => {
    setPortfolioAssets(
      portfolioAssets.map(asset => ({
        ...asset,
        selected: asset.title === title,
      }))
    )
  }

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
          <FlexWrapper>
            <ChartWrapper>
              <DonutChart
                color="#aaaaaa11"
                values={portfolioAssets}
                percentageValue="investmentSize"
                onClick={handleDonutChartClick}
              />
            </ChartWrapper>
            <Assets>
              {portfolioAssets &&
                portfolioAssets.map(asset => (
                  <Asset color={asset.color} selected={asset.selected}>
                    {asset.title}: {formatWithSpaces(asset.investmentSize)}
                  </Asset>
                ))}
            </Assets>
          </FlexWrapper>
          {JSON.stringify(portfolioAssets)}
        </Column>
      </FlexWrapper>
    </Wrapper>
  )
}

export default Portfolio
