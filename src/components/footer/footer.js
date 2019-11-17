import React from "react"
import styled from "styled-components"
import {
  DP6,
  BACKGROUND,
  BACKGROUND_ACTIVE,
  ON_BACKGROUND,
  MAIN_THEME,
} from "../../constants/theme"

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10vh;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Item = styled.button`
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
      p.active ? MAIN_THEME.PRIMARY.color.background : BACKGROUND_ACTIVE};
  }
`

const Footer = ({ items, page }) => {
  return (
    <Wrapper>
      <ButtonContainer>
        {items.map(item => (
          <Item
            key={item.title}
            active={item.title.toLowerCase() === page}
            onClick={() => item.onClick()}
          >
            {item.title}
          </Item>
        ))}
      </ButtonContainer>
    </Wrapper>
  )
}

export default Footer
