import styled from "styled-components"
import {
  SURFACE,
  BACKGROUND,
  ON_BACKGROUND,
  FADED_TEXT_COLOR,
  ERROR,
  DP6,
  BACKGROUND_ACTIVE,
  PRIMARY,
  HIGH_EMPHASIS,
} from "../../constants/theme"

export const Wrapper = styled.div`
  margin: 1rem 0;
  background: ${SURFACE};
  padding: 1rem;
  box-shadow: ${DP6};
`

export const Button = styled.button`
  margin: 1rem 0.2rem;
  padding: 1rem;
  background-color: ${p => p.backgroundColor || BACKGROUND};
  color: ${p => p.color || ON_BACKGROUND};
  border: none;
  width: 100%;
  box-shadow: ${DP6};
  text-transform: uppercase;
  cursor: pointer;
  :hover {
    background-color: ${BACKGROUND_ACTIVE};
  }
`

export const Em = styled.em`
  color: ${PRIMARY};
  font-style: normal;
`

export const FieldHint = styled.p`
  margin: 0;
  color: ${FADED_TEXT_COLOR};
`

export const ErrorMessage = styled(FieldHint)`
  color: ${ERROR};
`

export const FlexWrapper = styled.div`
  display: flex;
`

export const Span = styled.span`
  opacity: ${HIGH_EMPHASIS};
  color: ${ON_BACKGROUND};
`
