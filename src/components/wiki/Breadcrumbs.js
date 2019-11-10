import React from "react"
import styled from "styled-components"
import { SVG, arrowRight } from "project-pillow-components"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
`
const Crumb = styled.button`
  margin: 0;
  padding: 0;
  font-size: x-small;
  color: ${p => p.color};
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
`

const Breadcrumbs = ({ crumbs = [], color = "#ffffff55", setSelected }) => {
  return (
    <Wrapper>
      {crumbs.map((crumb, index) => (
        <Breadcrumb onClick={() => setSelected(crumb)}>
          {index !== 0 && <SVG color={color} {...arrowRight} size={12} />}
          <Crumb color={color}>{crumb}</Crumb>
        </Breadcrumb>
      ))}
    </Wrapper>
  )
}

export default Breadcrumbs
