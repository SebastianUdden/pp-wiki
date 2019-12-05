import React, { useState } from "react"
import styled from "styled-components"
import {
  AppBarTop,
  Search,
  ActionItem,
  menu,
  search,
  ToggleSwitch,
} from "project-pillow-components"
import { MEDIA_MAX_MEDIUM } from "../../constants/sizes"
import { DEFAULT_FONT } from "../../constants/font"
import { MAIN_THEME } from "../../constants/theme"
import { useUser } from "../../contexts/UserContext"

const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

const Label = styled.label`
  margin-left: 0.5rem;
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  font-family: ${DEFAULT_FONT.family};
  font-size: ${DEFAULT_FONT.largeSize};
  margin: ${p => (p.large ? "2.5rem" : 0)} 0 0 0.2rem;
  padding: 0;
  cursor: pointer;
  ${MEDIA_MAX_MEDIUM} {
    margin: ${p => (p.large ? "2.5rem" : 0)} 0 0 0.2rem;
  }
  :hover {
    color: ${p => p.color};
  }
`

const TopMenu = ({
  setHide,
  setSearchValue,
  setSelected,
  toggleStyle,
  onToggleStyle,
}) => {
  const { setPage, user } = useUser()
  const [value, setValue] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  return (
    <AppBarTop>
      {!showSearch && (
        <>
          <InnerWrapper>
            <ActionItem
              id="hamburger-menu"
              colorHover={MAIN_THEME.PRIMARY.color.background}
              svg={menu}
              onClick={() => {
                if (!user.loggedIn) return
                setHide(false)
              }}
              padding="1rem"
            />
            <Title
              color={MAIN_THEME.PRIMARY.color.background}
              onClick={() => {
                if (!user.loggedIn) return
                setPage("wiki")
                setSelected(undefined)
                setSearchValue("")
              }}
            >
              Wiki
            </Title>
          </InnerWrapper>
          <InnerWrapper>
            <Toggle>
              <ToggleSwitch
                checked={toggleStyle}
                onClick={onToggleStyle}
                backgroundColor={MAIN_THEME.PRIMARY.color.background}
              />
              <Label>Byt tema</Label>
            </Toggle>
            <ActionItem
              svg={search}
              onClick={() => {
                setShowSearch(true)
                setTimeout(() => document.getElementById("Search").focus(), 200)
              }}
              padding="1rem"
            />
          </InnerWrapper>
        </>
      )}
      {showSearch && (
        <Search
          value={value}
          previousSearchValue="Development"
          onChange={e => setValue(e.target.value)}
          onBack={() => {
            setShowSearch(false)
            setValue("")
            setSearchValue("")
          }}
          onClose={() => setShowSearch(false)}
          onSubmit={value => {
            setSelected(undefined)
            setSearchValue(value)
          }}
          padding="1rem"
        />
      )}
    </AppBarTop>
  )
}

export default TopMenu
