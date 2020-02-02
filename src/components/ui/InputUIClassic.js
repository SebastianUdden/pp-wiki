import React, { useState } from "react"
import styled from "styled-components"

const InputWrapper = styled.div`
  margin: ${p => (p.useMargin ? "1rem auto" : "0")};
  width: 100%;
`

const Label = styled.label`
  display: block;
  color: #999999;
  transform: ${p =>
    `translateY(${p.hasValue ? 0 : "1.6rem"}) translateX(${
      p.hasValue ? "-0.15rem" : 0
    })`};
  margin-left: 0.15rem;
  transition: transform 0.2s ease-in-out;
  pointer-events: none;
`

const InputUI = styled.input`
  width: 100%;
  display: block;
  padding: 0.2rem;
  background-color: #777777;
  color: inherit;
  outline: none;
  border: none;
  /* border-bottom: 1px solid ${p => (p.hasValue ? "green" : "red")}; */
`

const formatWithSpaces = value =>
  value &&
  value
    .toString()
    .replace(/ /g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const InputClassic = ({
  type,
  label,
  value,
  onChange,
  width,
  max,
  min,
  useMargin,
}) => {
  const [focus, setFocus] = useState(false)
  const formattedValue = formatWithSpaces(value)

  return (
    <InputWrapper useMargin={useMargin}>
      {label && (
        <Label hasValue={value !== "" && value !== undefined}>{label}</Label>
      )}
      {focus ? (
        <InputUI
          max={max}
          min={min}
          type={type}
          hasValue={value}
          value={value}
          onChange={onChange}
          width={width}
          onBlur={e => setFocus(false)}
        />
      ) : (
        <InputUI
          type="text"
          hasValue={value}
          value={type === "number" ? formattedValue : value}
          width={width}
          onFocus={e => setFocus(true)}
        />
      )}
    </InputWrapper>
  )
}

export default InputClassic
