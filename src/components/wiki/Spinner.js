import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { H2 } from "./utils"
import { SVG, refresh } from "project-pillow-components"

const P = styled.p`
  color: #888888;
  margin: 0.5rem 0;
`

const Spinner = ({}) => {
  const [count, setCount] = useState(0)
  const [longCount, setLongCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count < 10 ? count + 1 : 0)
      if (count === 0) setLongCount(longCount + 1)
    }, 250)
    return () => clearTimeout(timeout)
  }, [count])
  return (
    <div>
      <H2>Loading{".".repeat(count)}</H2>
      {longCount > 2 && (
        <P>
          Try reloading the page with{" "}
          <SVG {...refresh} color="#ffffff" onClick={() => location.reload()} />{" "}
          if the loader seems stuck.
        </P>
      )}
    </div>
  )
}

export default Spinner
