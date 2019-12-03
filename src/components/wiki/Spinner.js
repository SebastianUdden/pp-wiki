import React, { useState, useEffect } from "react"
import { H2 } from "./utils"

const Spinner = ({}) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count + 1)
    }, 250)
    return () => clearTimeout(timeout)
  }, [count])
  return <H2>Loading{".".repeat(count)}</H2>
}

export default Spinner
