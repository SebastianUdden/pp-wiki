import React, { useState } from "react"
import styled from "styled-components"
import { DP6, MAIN_THEME } from "../../constants/theme"
import { NavigationDrawer } from "project-pillow-components"
import NavLink from "./NavLink"

const H2 = styled.h2`
  margin-left: 0.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  :hover {
    color: ${p => p.color};
  }
`

const SideMenu = ({
  hide,
  onHide,
  setPage,
  selected,
  setSelected,
  setSearchValue,
  data,
}) => {
  return (
    <NavigationDrawer
      boxShadow={DP6}
      color={MAIN_THEME.WHITE.color.foreground}
      backgroundColor={MAIN_THEME.WHITE.color.background}
      onHide={onHide}
      hide={hide}
      buttonElementId="hamburger-menu"
    >
      <H2
        color={MAIN_THEME.PRIMARY.color.background}
        onClick={() => {
          setSelected(undefined)
          setSearchValue("")
          onHide()
        }}
      >
        {data && data.title}
      </H2>
      {data &&
        data.children &&
        data.children.map(child => (
          <NavLink
            child={child}
            onHide={onHide}
            setPage={setPage}
            selected={selected}
            setSelected={setSelected}
            setSearchValue={setSearchValue}
          />
        ))}
    </NavigationDrawer>
  )
}

export default SideMenu
