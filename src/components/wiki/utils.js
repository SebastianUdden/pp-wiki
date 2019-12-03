import styled from "styled-components"
import { MAIN_THEME, DP6 } from "../../constants/theme"

export const TitleInput = styled.input`
  background-color: inherit;
  color: ${MAIN_THEME.PRIMARY.color.foreground};
  border: none;
  outline: none;
  width: 100%;
  box-shadow: ${DP6};
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
`
export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`
export const ToggleWrapper = styled.div`
  margin: 0 0.6rem 0 0;
`
export const H2 = styled.h2`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.2rem 0.5rem;
`
