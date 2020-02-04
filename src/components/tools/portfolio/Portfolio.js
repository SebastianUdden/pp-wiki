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

const Title = styled.h3`
  padding: 2px;
  border-bottom: 2px solid ${p => p.color};
`
const Invested = styled.p`
  margin: 0;
`

const Currency = styled.span`
  font-weight: bold;
  padding: 4px;
  border-top: 2px solid ${p => p.color};
  border-right: 2px solid ${p => p.color};
`

const Assets = styled.div`
  margin: 1rem;
`

const Asset = styled.p`
  margin: 0.2rem 0;
  padding: 0.3rem 0.5rem;
  border-left: ${p => (p.selected ? 6 : 1)}px solid ${p => p.color};
  border-top: 2px dashed ${p => p.color};
  background-color: ${p => (p.selected ? "#444444" : "inherit")};
  :hover {
    cursor: pointer;
    background-color: #222222;
    border-right: ${p => (p.selected ? 6 : 1)}px solid ${p => p.color};
    margin-right: ${p => -(p.selected ? 6 : 1)}px;
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
  "#D50000",
  "#C51162",
  "#AA00FF",
  "#6200EA",
  "#304FFE",
  "#2962FF",
  "#0091EA",
  "#00B8D4",
  "#00BFA5",
  "#00C853",
  "#64DD17",
  "#AEEA00",
  "#FFD600",
  "#FFAB00",
  "#FF6D00",
  "#DD2C00",
  "#3E2723",
  "#78909C",
  "#455A64",
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
  const [assetName, setAssetName] = useState("Stock name")
  const [investmentSize, setInvestmentSize] = useState(3000)
  const [totalInvested, setTotalInvested] = useState(0)

  const handleDonutChartClick = id => {
    setPortfolioAssets(
      portfolioAssets.map(asset => ({
        ...asset,
        selected: asset.id === id,
      }))
    )
  }

  useEffect(() => {
    setTotalInvested(portfolioAssets.reduce((a, b) => a + b.investmentSize, 0))
  }, [portfolioAssets])
  const selectedAsset = portfolioAssets.find(a => a.selected)
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
              id: Math.floor(
                Math.random() * 10 * Math.random() * 1000 * Math.random()
              ),
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
                  <Asset
                    color={asset.color}
                    selected={asset.selected}
                    onClick={() => handleDonutChartClick(asset.id)}
                  >
                    {asset.title}: {formatWithSpaces(asset.investmentSize)}
                  </Asset>
                ))}
            </Assets>
            {selectedAsset && (
              <Assets>
                <Title color={selectedAsset.color}>{selectedAsset.title}</Title>
                <Invested>
                  {formatWithSpaces(selectedAsset.investmentSize)}{" "}
                  <Currency color={selectedAsset.color}>kr</Currency>
                </Invested>
              </Assets>
            )}
          </FlexWrapper>
          {JSON.stringify(portfolioAssets)}
        </Column>
      </FlexWrapper>
    </Wrapper>
  )
}

export default Portfolio
