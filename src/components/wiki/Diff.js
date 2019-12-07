import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  border-left: 4px dashed ${p => p.color};
  margin-left: -5px;
  height: 100%;
`

const Diff = ({ color = "#777777" }) => <Wrapper color={color}></Wrapper>

export default Diff
