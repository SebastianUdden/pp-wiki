import React, { useState } from "react"
import styled from "styled-components"
import { DP6, MAIN_THEME } from "../../constants/theme"
import { NavigationDrawer, SVG, refresh } from "project-pillow-components"
import NavLink from "./NavLink"
import { useUser } from "../../contexts/UserContext"
import { useWiki } from "../../contexts/WikiContext"

const H2 = styled.h2`
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Small = styled.span`
  border-top: 1px solid #44444466;
  padding-top: 0.3rem;
  font-size: x-small;
  opacity: 0.4;
`

const Span = styled.span`
  cursor: pointer;
  :hover {
    color: ${p => p.color};
  }
`

const Button = styled.button`
  outline: none;
  border: none;
  background-color: inherit;
  padding: 0.5rem;
  cursor: pointer;
`

const SideMenu = ({
  hide,
  onHide,
  selected,
  setSelected,
  setSearchValue,
  levelDepth,
  setLevelDepth,
  reload,
  setReload,
  data: dataProps,
}) => {
  const [showLevel, setShowLevel] = useState(1)
  const { wikiEntries } = useWiki()
  const { setPage } = useUser()
  if (!dataProps) return null
  const id = dataProps._id || dataProps
  const data = wikiEntries.find(entry => entry._id === id)

  return (
    <NavigationDrawer
      boxShadow={DP6}
      color={MAIN_THEME.WHITE.color.foreground}
      backgroundColor={MAIN_THEME.WHITE.color.background}
      onHide={onHide}
      hide={hide}
      buttonElementId="hamburger-menu"
    >
      <H2 color={MAIN_THEME.PRIMARY.color.background}>
        <Span
          onClick={() => {
            setSelected(undefined)
            setSearchValue("")
            onHide()
            setPage("wiki")
          }}
        >
          {data && data.title}
        </Span>
        <SVG
          onClick={() => {
            setReload(!reload)
            setPage("wiki")
          }}
          {...refresh}
          color="black"
        />
        <InnerWrapper>
          <div>
            <Button
              onClick={() => setShowLevel(showLevel + 1)}
              disabled={showLevel >= levelDepth}
            >
              +
            </Button>
            <Button
              disabled={showLevel < 2}
              onClick={() => setShowLevel(showLevel - 1)}
            >
              -
            </Button>
          </div>
          <Small>Level {showLevel}</Small>
        </InnerWrapper>
      </H2>
      {data &&
        data.children &&
        data.children.map((child, index) => (
          <NavLink
            key={child}
            lvl={1}
            showLevel={showLevel}
            child={child}
            lastChild={index === data.children.length - 1}
            onHide={onHide}
            selected={selected}
            setSelected={setSelected}
            setSearchValue={setSearchValue}
            levelDepth={levelDepth}
            setLevelDepth={setLevelDepth}
          />
        ))}
    </NavigationDrawer>
  )
}

export default SideMenu
