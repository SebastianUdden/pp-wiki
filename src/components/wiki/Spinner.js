import React, { useState, useEffect } from "react"
import { H2 } from "./utils"

const Spinner = ({}) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count < 10 ? count + 1 : 0)
    }, 250)
    return () => clearTimeout(timeout)
  }, [count])
  return (
    <H2>
      {count < 60 ? (
        <>Loading{".".repeat(count)}</>
      ) : (
        <>Something went wrong, try reloading the page...</>
      )}
    </H2>
  )
}

export default Spinner
