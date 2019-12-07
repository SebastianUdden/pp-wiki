import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { insertPhoto, NavigationLink } from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"
import ToggleDropdown from "./ToggleDropdown"

const Wrapper = styled.div`
  margin: 0;
  margin-left: 0.4rem;
  border-left: ${p => 8 - p.lvl}px solid black;
  ${p =>
    p.lastChild &&
    css`
      margin-top: -0.18rem;
      border-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 1) 0,
        rgba(0, 0, 0, 1) 1.45rem,
        rgba(0, 0, 0, 0) 1.45rem
      );
      border-image-slice: 0 0 0 1;
    `};
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  max-height: 4rem;
`

const Line = styled.svg`
  width: 0.4rem;
`

const NavLink = ({
  child,
  lvl,
  showLevel,
  lastChild,
  setPage,
  onHide,
  selected,
  setSelected,
  setSearchValue,
}) => {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    setShowChildren(showLevel > lvl)
  }, [showLevel])
  return (
    <Wrapper key={child._id} lvl={lvl} lastChild={lastChild}>
      <InnerWrapper>
        <Line lvl={lvl} viewBox="0 0 100 100">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="black"
            strokeWidth="10rem"
          />
        </Line>
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={insertPhoto}
          title={child.title}
          onClick={() => {
            setPage("wiki")
            onHide()
            setSelected(child.title)
            setSearchValue(undefined)
          }}
          selected={selected === child._id}
        />
        {child.children.length ? (
          <ToggleDropdown
            showChildren={showChildren}
            onClick={() => setShowChildren(!showChildren)}
          />
        ) : null}
      </InnerWrapper>
      {showChildren &&
        child.children &&
        child.children.map((subChild, index) => (
          <NavLink
            child={subChild}
            lvl={lvl + 1}
            showLevel={showLevel}
            lastChild={index === child.children.length - 1}
            setPage={setPage}
            onHide={onHide}
            selected={selected}
            setSelected={setSelected}
            setSearchValue={setSearchValue}
          />
        ))}
    </Wrapper>
  )
}

export default NavLink