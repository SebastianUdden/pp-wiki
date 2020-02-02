import React from "react"
import styled from "styled-components"

const SVG = styled.svg`
  width: 100%;
  max-height: 100%;
`
const ChartContainer = ({ id, color, children }) => {
  return (
    <SVG id={id} fill={color} viewBox="0 0 100 100">
      {children}
    </SVG>
  )
}

const Donut = styled.circle`
  fill: none;
  stroke: ${p => p.color};
  stroke-width: 12;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`
// 2 * π * R  = C
// 2 * π * 40 ≈ 251.327
const DonutFill = styled.circle`
  fill: none;
  stroke: ${p => (p.selected ? "black" : p.color)};
  stroke-width: 12;
  stroke-dasharray: 276.46;
  stroke-dashoffset: ${p => p.fillOffset}px;
  transition: stroke-dashoffset 0.3s ease;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  :hover {
    cursor: pointer;
    stroke: #222222;
  }
`

const DonutChart = ({ values = [], percentageValue, color, onClick }) => {
  const valuesSum = values.reduce((a, b) => a + b[percentageValue], 0)
  const newValues = values.map(v => ({
    ...v,
    fillPercentage: v[percentageValue] / valuesSum,
  }))

  return (
    <ChartContainer id="Donut" color={color}>
      <Donut cx="50" cy="50" r="44" color={color} />
      {newValues
        .map((value, index) => ({
          ...value,
          calculatedPosition:
            newValues
              .slice(0, index)
              .reduce((a, b) => a + b.fillPercentage, 0) + value.fillPercentage,
        }))
        .reverse()
        .map(value => (
          <DonutFill
            title={value.title}
            cx="50"
            cy="50"
            r="44"
            color={value.color}
            fillOffset={276.46 * (1 - value.calculatedPosition)}
            selected={value.selected}
            onClick={() => onClick(value.title)}
          />
        ))}
    </ChartContainer>
  )
}

export default DonutChart
