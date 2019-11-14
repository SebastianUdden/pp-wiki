import React, { useState } from "react"
import styled from "styled-components"

import { SVG } from "../svg/svg"
import {
  Card,
  rocket,
  rocketColored,
  forward30,
} from "project-pillow-components"
import { useUser } from "../../contexts/UserContext"
import { PRIMARY, SURFACE, HIGH_EMPHASIS } from "../../constants/theme"

const Wrapper = styled.div`
  background: ${SURFACE};
  padding: 1rem;
`
const H1 = styled.h1`
  opacity: ${HIGH_EMPHASIS};
`
const P = styled.p`
  opacity: ${HIGH_EMPHASIS};
`
const Em = styled.em`
  color: ${PRIMARY};
  font-style: normal;
`
const SVGWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
`

const Home = () => {
  const { user, setPage } = useUser()
  const [card, setCard] = useState(undefined)

  return (
    <Wrapper>
      <H1>
        Hey{" "}
        <Em>{(user.loggedIn && (user.username || user.email)) || "buddy"}</Em>!
      </H1>
      <P>
        This will be the base of many awesome apps! Try out react context with a
        clientside <Em>signup</Em> by clicking the{" "}
        <SVG {...forward30} size={18} color={PRIMARY} />
        <SVG {...rocket} size={18} color={PRIMARY} /> below...
      </P>
      <SVGWrapper
        onClick={() => {
          setPage("signup")
        }}
      >
        <SVG {...rocketColored} size={240} />
      </SVGWrapper>
    </Wrapper>
  )
}

export default Home
