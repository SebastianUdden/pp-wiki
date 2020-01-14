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
  align-items: ${p => p.alignment || "center"};
  justify-content: space-between;
  flex-direction: ${p => (p.column ? "column" : "row")};
  margin: 0;
`
export const ToggleWrapper = styled.div`
  margin: ${p => p.margin || "0 0.6rem 0 0"};
`
export const H2 = styled.h2`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.2rem 0.5rem;
`

export const arraysEqual = (arr1, arr2) => {
  if (!arr1 && !arr2) return true
  if (arr1 && !arr2) return false
  if (!arr1 && arr2) return false
  if (arr1.length !== arr2.length) return false
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false
  }

  return true
}
