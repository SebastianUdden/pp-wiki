import React from "react"
import styled from "styled-components"
import { arrowDropUp, arrowDropDown, SVG } from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    border: 1px dashed #88888877;
    svg {
      fill-opacity: 0.6;
    }
  }
`

const ToggleDropdown = ({ showChildren, onClick }) => (
  <Wrapper onClick={onClick}>
    {showChildren ? (
      <SVG {...arrowDropUp} color={MAIN_THEME.WHITE.color.foreground} />
    ) : (
      <SVG {...arrowDropDown} color={MAIN_THEME.WHITE.color.foreground} />
    )}
  </Wrapper>
)

export default ToggleDropdown
