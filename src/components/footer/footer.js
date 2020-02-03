import React from "react"
import styled from "styled-components"
import {
  DP6,
  BACKGROUND,
  BACKGROUND_ACTIVE,
  ON_BACKGROUND,
  MAIN_THEME,
} from "../../constants/theme"
import { SVG } from "project-pillow-components"

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Title = styled.p`
  margin-top: -0.6rem;
  font-size: x-small;
`

const Item = styled.button`
  border: none;
  padding-top: 0.7rem;
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
      p.active ? MAIN_THEME.PRIMARY.color.background : BACKGROUND_ACTIVE};
  }
`

const Footer = ({ items, page }) => {
  return (
    <FooterWrapper>
      <ButtonContainer>
        {items.map(item => (
          <Item
            key={item.title}
            active={item.title.toLowerCase() === page}
            onClick={() => item.onClick()}
          >
            <SVG {...item.svg} size="1.7rem" />
            <Title>{item.title}</Title>
          </Item>
        ))}
      </ButtonContainer>
    </FooterWrapper>
  )
}

export default Footer
