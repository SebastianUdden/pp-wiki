import React, { useState, useEffect } from "react"
import styled from "styled-components"

import {
  rocket,
  rocketColored,
  forward30,
  SVG,
} from "project-pillow-components"
import { useUser } from "../../contexts/UserContext"
import { PRIMARY, SURFACE, HIGH_EMPHASIS } from "../../constants/theme"
import { Wrapper } from "../user/common"

const H1 = styled.h1`
  opacity: ${HIGH_EMPHASIS};
`
const P = styled.p`
  opacity: ${HIGH_EMPHASIS};
`
const A = styled.a`
  text-decoration: none;
  color: orange;
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
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count + 1)
    }, 120)
    return () => clearTimeout(timeout)
  }, [count])

  return (
    <Wrapper>
      <H1>
        Hey{" "}
        <Em>{(user.loggedIn && (user.username || user.email)) || "buddy"}</Em>!
      </H1>
      <P>
        I'm the Pillow Wiki, fill me with all your <Em>crunchy data</Em> and{" "}
        <Em>wisdom</Em> from inside that beautiful brain of yours. Tips on how
        to structure your information can be found{" "}
        <A
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          target="_blank"
        >
          here
        </A>
        ! Join me and your friendly collaborators on this journey to build a{" "}
        <Em>mega hive mind</Em> and we'll <Em>win the future!</Em> In fact, I'm
        positive this will be a{" "}
        <Em>
          win
          {count > 90 && count < 300 && " win".repeat(count - 90)}
          {count > 299 && " win".repeat(209)}
        </Em>
        ... {count > 299 && "wouldn't you agree? Let's be awesome together!"}
        {!user.loggedIn && (
          <>
            <Em>Signup</Em> by clicking the{" "}
            <SVG {...forward30} size={18} color={PRIMARY} />
            <SVG {...rocket} size={18} color={PRIMARY} /> below...
          </>
        )}
      </P>
      <SVGWrapper
        onClick={() => {
          setPage(user.loggedIn ? "wiki" : "signup")
        }}
      >
        <SVG {...rocketColored} size={240} />
      </SVGWrapper>
    </Wrapper>
  )
}

export default Home
