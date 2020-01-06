import React, { useState } from "react"
import styled from "styled-components"
import {
  AppBarTop,
  Search,
  ActionItem,
  menu,
  search,
  arrowBack,
  ToggleSwitch,
  arrowForward,
} from "project-pillow-components"
import { MEDIA_MAX_MEDIUM } from "../../constants/sizes"
import { DEFAULT_FONT } from "../../constants/font"
import { MAIN_THEME } from "../../constants/theme"
import { useUser } from "../../contexts/UserContext"

const Query = styled.span`
  margin: 0 0.5rem;
  color: ${MAIN_THEME.WHITE.color.background};
  ${MEDIA_MAX_MEDIUM} {
    display: none;
  }
`

const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0;
`

const Label = styled.label`
  margin-left: 0.5rem;
  cursor: pointer;
  ${MEDIA_MAX_MEDIUM} {
    display: none;
  }
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
    margin: 0 0 0 0.2rem;
  }
  :hover {
    color: ${p => p.color};
  }
`

const TopMenu = ({
  setHide,
  setSearchValue,
  setSelected,
  history,
  historyIndex,
  setHistoryIndex,
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
              padding={1}
            />
            <Title
              color={MAIN_THEME.PRIMARY.color.background}
              onClick={() => {
                if (!user.loggedIn) return
                setPage("wiki")
                setSelected("")
                setSearchValue("")
              }}
            >
              Wiki
            </Title>
          </InnerWrapper>
          <InnerWrapper>
            <Query>
              {history[historyIndex] && history[historyIndex].value}
            </Query>
            {historyIndex > 0 && (
              <ActionItem
                color={MAIN_THEME.WHITE.color.background}
                svg={arrowBack}
                onClick={() => setHistoryIndex(historyIndex - 1)}
                padding={1}
              />
            )}
            {historyIndex < history.length - 1 && (
              <ActionItem
                color={MAIN_THEME.WHITE.color.background}
                svg={arrowForward}
                onClick={() => setHistoryIndex(historyIndex + 1)}
                padding={1}
              />
            )}
            <Toggle>
              <ToggleSwitch
                size={30}
                checked={toggleStyle}
                onClick={onToggleStyle}
                backgroundColor={MAIN_THEME.PRIMARY.color.background}
              />
              <Label onClick={onToggleStyle}>Byt tema</Label>
            </Toggle>
            <ActionItem
              svg={search}
              onClick={() => {
                setShowSearch(true)
                setTimeout(() => document.getElementById("Search").focus(), 200)
              }}
              padding={1}
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
            setSelected("")
            setSearchValue(value)
          }}
          padding="1rem"
        />
      )}
    </AppBarTop>
  )
}

export default TopMenu
