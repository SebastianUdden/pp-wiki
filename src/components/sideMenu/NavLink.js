import React from "react"
import styled from "styled-components"
import { insertPhoto, NavigationLink } from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"

const Wrapper = styled.div`
  margin: 0.3rem 0;
  margin-left: 0.8rem;
`

const NavLink = ({
  child,
  setPage,
  onHide,
  selected,
  setSelected,
  setSearchValue,
}) => {
  return (
    <Wrapper key={child._id}>
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
      {child.children &&
        child.children.map(subChild => (
          <NavLink
            child={subChild}
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
