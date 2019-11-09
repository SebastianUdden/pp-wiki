import React, { useState } from "react"
import styled from "styled-components"
import { Card } from "project-pillow-components"
import { DP_TYPES } from "../../constants/theme"

const Wrapper = styled.div`
  width: 100%;
  /* background-color: #44444477;
  padding: 2rem;
  box-shadow: ${DP_TYPES.DP6}; */
`

const Wiki = ({ searchValue, parentIsMatch = false, data }) => {
  const isMatch =
    data.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    parentIsMatch
  // check if dynamic headers is possible
  return isMatch ? (
    <Wrapper>
      {data && (
        <>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          {data.children &&
            data.children.map(child => (
              <Wiki
                data={child}
                searchValue={searchValue}
                parentIsMatch={data.showChildren}
              />
            ))}
        </>
      )}
    </Wrapper>
  ) : data.children ? (
    data.children.map(child => (
      <Wiki
        data={child}
        searchValue={searchValue}
        parentIsMatch={parentIsMatch || searchValue === data.id}
      />
    ))
  ) : null
}

export default Wiki
