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
  DP2,
} from "../../constants/theme"

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0.5rem auto;
  padding: 1rem;
  border-radius: 7px;
  background: ${SURFACE};
  box-shadow: ${DP6};
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 7px;

  padding: 0.6rem 1rem;
  background-color: ${p => p.backgroundColor || BACKGROUND};
  color: ${p => p.color || ON_BACKGROUND};
  border: none;
  box-shadow: ${DP2};
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
