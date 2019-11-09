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

const H2 = styled.h2`
  margin-bottom: 2rem;
`

const SubNavigationLinkWrapper = styled.div`
  margin-left: 2rem;
  border: 1px solid red;
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
