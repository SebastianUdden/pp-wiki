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

const HeaderButtons = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const Button = styled.button`
  padding: 1rem;
  border: none;
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
  const [tab, setTab] = useState(0)
  return (
    <Wrapper theme={theme}>
      <HeaderButtons>
        <Button
          active={tab === 0}
          onClick={() => setTab(0)}
          backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
        >
          Borsdata API tester
        </Button>
        <Button
          active={tab === 1}
          onClick={() => setTab(1)}
          backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
        >
          Case builder
        </Button>
        <Button
          active={tab === 2}
          onClick={() => setTab(2)}
          backgroundColor={MAIN_THEME.PRIMARY_DARK.color.background}
        >
          Extrapolator
        </Button>
      </HeaderButtons>
      {tab === 0 && <Borsdata />}
      {tab === 1 && <Case />}
      {tab === 2 && <Extrapolator />}
    </Wrapper>
  )
}

export default Tools
