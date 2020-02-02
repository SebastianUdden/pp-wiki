import styled, { css } from "styled-components"
import { DP_TYPES } from "../constants/theme"
import { MEDIA_MIN_MEDIUM } from "../constants/sizes"

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  margin: 0.5rem auto;
  border-radius: 7px;

  ${p => {
    switch (p.theme) {
      case "Grey":
        return css`
          background-color: #44444477;
          padding: 0.5rem;
          box-shadow: ${DP_TYPES.DP6};
          ${MEDIA_MIN_MEDIUM} {
            padding: 1.5rem 3rem;
          }
        `
      case "Light":
        return css`
          margin: 0;
          background-color: #ffffff;
          color: #000000;
          p,
          input,
          li {
            color: #000000;
          }
          div.crumbs button,
          div.crumbs svg {
            color: #666666;
            font-size: large;
          }
          padding: 0.5rem;
        `
      default:
        break
    }
  }}
`
