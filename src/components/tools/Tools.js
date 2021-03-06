import React, { useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../common"
import {
  MAIN_THEME,
  ON_BACKGROUND,
  BACKGROUND,
  DP6,
  BACKGROUND_ACTIVE,
} from "../../constants/theme"
import Case from "./case/Case"
import Borsdata from "./borsdata/Borsdata"
import Extrapolator from "./extrapolator/Extrapolator"
import Portfolio from "./portfolio/Portfolio"

const HeaderButtons = styled.div`
  margin-bottom: 1rem;
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

const Tools = ({ theme = "Grey" }) => {
  const [tab, setTab] = useState(3)
  const [showTabs, setShowTabs] = useState(false)
  return (
    <Wrapper theme={theme}>
      {!showTabs && (
        <Button
          onClick={() => setShowTabs(true)}
          backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
        >
          Menu
        </Button>
      )}
      {showTabs && (
        <HeaderButtons>
          <Button
            active={tab === 0}
            onClick={() => {
              setTab(0)
              setShowTabs(false)
            }}
            backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
          >
            Borsdata API tester
          </Button>
          <Button
            active={tab === 1}
            onClick={() => {
              setTab(1)
              setShowTabs(false)
            }}
            backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
          >
            Case builder
          </Button>
          <Button
            active={tab === 2}
            onClick={() => {
              setTab(2)
              setShowTabs(false)
            }}
            backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
          >
            Extrapolator
          </Button>
          <Button
            active={tab === 3}
            onClick={() => {
              setTab(3)
              setShowTabs(false)
            }}
            backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
          >
            Portfolio
          </Button>
        </HeaderButtons>
      )}
      {!showTabs && tab === 0 && <Borsdata />}
      {!showTabs && tab === 1 && <Case />}
      {!showTabs && tab === 2 && <Extrapolator />}
      {!showTabs && tab === 3 && <Portfolio />}
    </Wrapper>
  )
}

export default Tools
