import React, { useState } from "react"
import styled from "styled-components"
import { Card } from "project-pillow-components"

const Wrapper = styled.div`
  border: 1px solid red;
  width: 100%;
  background-color: #44444477;
  padding: 2rem;
`

const Wiki = ({ data }) => {
  return (
    <Wrapper>
      {data && (
        <>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          {data.children && data.children.map(child => <Wiki data={child} />)}
        </>
      )}
    </Wrapper>
  )
}

export default Wiki
