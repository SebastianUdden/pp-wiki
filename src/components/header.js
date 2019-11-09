import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { LARGE, MEDIA_MAX_MEDIUM } from "../constants/sizes"
import {
  BASE_TEXT_HOVER_COLOR,
  ON_SURFACE,
  HIGH_EMPHASIS,
  PRIMARY,
  DP6,
  PRIMARY_BACKGROUND,
  BACKGROUND,
  MAIN_THEME,
} from "../constants/theme"
import { useUser } from "../contexts/UserContext"
import {
  AppBarTop,
  Search,
  ActionItem,
  menu,
  search,
  hide,
  star,
  schedule,
  bookmark,
  bookmarks,
  insertPhoto,
  supervisorAccount,
  NavigationDrawer,
  NavigationLink,
} from "project-pillow-components"
import { DEFAULT_FONT } from "../constants/font"
import { MOCK_WIKI } from "./wiki/wiki-mocks"

const Wrapper = styled.header`
  background: ${BACKGROUND};
  box-shadow: ${DP6};
  margin-bottom: 1.45rem;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${LARGE}px;
  padding: 1.45rem 1.0875rem;
`

const Home = styled.h1`
  margin: 0;
`

const MainLink = styled(Link)`
  color: ${ON_SURFACE};
  opacity: ${HIGH_EMPHASIS};
  text-decoration: none;
  cursor: pointer;
  :hover {
    color: ${BASE_TEXT_HOVER_COLOR};
  }
`

const User = styled.h5`
  margin: 0;
  color: ${PRIMARY};
  cursor: pointer;
  :hover {
    color: ${PRIMARY_BACKGROUND};
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
  ${MEDIA_MAX_MEDIUM} {
    margin: ${p => (p.large ? "2.5rem" : 0)} 0 0 0.2rem;
  }
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const H2 = styled.h2`
  margin-bottom: 2rem;
`

const SubNavigationLinkWrapper = styled.div`
  margin-left: 2rem;
`

const Header = ({
  data = MOCK_WIKI,
  siteTitle,
  searchValue,
  setSearchValue,
}) => {
  const { user, setPage } = useUser()
  const [value, setValue] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const [selected, setSelected] = useState("")
  const [hide, setHide] = useState(true)

  const [showOverflow, setShowOverflow] = useState(false)

  return (
    <Wrapper>
      <NavigationDrawer
        boxShadow={DP6}
        color={MAIN_THEME.WHITE.color.foreground}
        backgroundColor={MAIN_THEME.WHITE.color.background}
        onHide={() => setHide(true)}
        hide={hide}
        buttonElementId="hamburger-menu"
      >
        <H2>{data.title}</H2>
        {data.children.map(child => (
          <>
            <NavigationLink
              backgroundColor={MAIN_THEME.PRIMARY.color.background}
              colorHover={MAIN_THEME.PRIMARY.color.background}
              color={MAIN_THEME.WHITE.color.foreground}
              svg={insertPhoto}
              title={child.title}
              onClick={() => {
                setHide(true)
                setSearchValue(child.title)
              }}
              selected={selected === child.id}
            />
            {child.children &&
              child.children.map(subChild => (
                <SubNavigationLinkWrapper>
                  <NavigationLink
                    backgroundColor={MAIN_THEME.PRIMARY.color.background}
                    colorHover={MAIN_THEME.PRIMARY.color.background}
                    color={MAIN_THEME.WHITE.color.foreground}
                    svg={insertPhoto}
                    title={subChild.title}
                    onClick={() => {
                      setHide(true)
                      setSearchValue(subChild.title)
                    }}
                    selected={selected === subChild.id}
                  />
                </SubNavigationLinkWrapper>
              ))}
          </>
        ))}
        {/* <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={insertPhoto}
          title="All photos"
          onClick={() => {
            setHide(true)
            setSelected("All photos")
          }}
          selected={selected === "All photos"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={supervisorAccount}
          title="Shared with me"
          onClick={() => {
            setHide(true)
            setSelected("Shared with me")
          }}
          selected={selected === "Shared with me"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={star}
          title="Starred"
          onClick={() => {
            setHide(true)
            setSelected("Starred")
          }}
          selected={selected === "Starred"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={schedule}
          title="Recent"
          onClick={() => {
            setHide(true)
            setSelected("Recent")
          }}
          selected={selected === "Recent"}
        />
        <hr />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmarks}
          title="All chapters"
          onClick={() => {
            setHide(true)
            setSelected("")
          }}
          selected={selected === ""}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 1"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 1")
          }}
          selected={selected === "Chapter 1"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 2"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 2")
          }}
          selected={selected === "Chapter 2"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 3"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 3")
          }}
          selected={selected === "Chapter 3"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 4"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 4")
          }}
          selected={selected === "Chapter 4"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 5"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 5")
          }}
          selected={selected === "Chapter 5"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 6"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 6")
          }}
          selected={selected === "Chapter 6"}
        />
        <NavigationLink
          backgroundColor={MAIN_THEME.PRIMARY.color.background}
          colorHover={MAIN_THEME.PRIMARY.color.background}
          color={MAIN_THEME.WHITE.color.foreground}
          svg={bookmark}
          title="Chapter 7"
          onClick={() => {
            setHide(true)
            setSelected("Chapter 7")
          }}
          selected={selected === "Chapter 7"}
        /> */}
      </NavigationDrawer>
      <AppBarTop>
        {!showSearch && (
          <>
            <InnerWrapper>
              <ActionItem
                id="hamburger-menu"
                svg={menu}
                onClick={() => {
                  setHide(false)
                }}
              />
              <Title>Wiki</Title>
            </InnerWrapper>
            <InnerWrapper>
              <ActionItem
                svg={search}
                onClick={() => {
                  setShowSearch(true)
                  setTimeout(
                    () => document.getElementById("Search").focus(),
                    200
                  )
                }}
              />
            </InnerWrapper>
          </>
        )}
        {showSearch && (
          <Search
            value={value}
            previousSearchValue="farm-to-table"
            onChange={e => setValue(e.target.value)}
            onBack={() => {
              setShowSearch(false)
              setValue("")
              setSearchValue("")
            }}
            onClose={() => setShowSearch(false)}
            onSubmit={value => setSearchValue(value)}
          />
        )}
      </AppBarTop>
      {/* <Head>
        <Home>
          <MainLink onClick={() => setPage("home")}>{siteTitle}</MainLink>
        </Home>
        <User onClick={() => setPage("settings")}>
          {user.loggedIn && <>&#x1F464; {user.username || user.email}</>}
        </User>
      </Head> */}
    </Wrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
