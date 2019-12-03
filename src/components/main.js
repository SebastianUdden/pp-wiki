import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "../contexts/UserContext"
import { apiUrl } from "../constants/urls"
import SEO from "./seo"
import Footer from "./footer/footer"
import { FOOTER_MENU } from "../constants/menus"

import {
  AppBarTop,
  Search,
  ActionItem,
  menu,
  search,
  insertPhoto,
  NavigationDrawer,
  NavigationLink,
  ToggleSwitch,
} from "project-pillow-components"

import Home from "./home/Home"
import Signup from "./user/Signup"
import Login from "./user/Login"
import Settings from "./user/Settings"
import { LOGIN_FIELDS, SIGNUP_FIELDS } from "../constants/fields"

import Wiki from "./wiki/Wiki"
import { DP6, MAIN_THEME } from "../constants/theme"
import { DEFAULT_FONT } from "../constants/font"
import { MEDIA_MAX_MEDIUM, MEDIA_MIN_MEDIUM } from "../constants/sizes"
import { get } from "./api/api"
import Spinner from "./wiki/Spinner"

const Page = styled.div`
  padding: 0;
  margin: 0;
  margin-bottom: 10vh;
`
const Body = styled.div`
  padding: 0 0.5rem;
  margin: 1rem auto;
  margin-bottom: 10vh;
  ${MEDIA_MIN_MEDIUM} {
    padding: 0 2rem;
  }
`
export const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`
export const Label = styled.label`
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

const H2 = styled.h2`
  margin-bottom: 2rem;
  cursor: pointer;
  :hover {
    color: ${p => p.color};
  }
`

const SubNavigationLinkWrapper = styled.div`
  margin-left: 2rem;
`

const getNodeChildren = (node, dataArray = []) => {
  return node && node.children
    ? node.children.map(child => {
        const treeNode = dataArray.find(
          data => data._id === child || data._id === child._id
        )
        if (!treeNode) return
        return {
          ...treeNode,
          children: getNodeChildren(treeNode, dataArray),
        }
      })
    : []
}

const createDataTree = dataArray => {
  if (!dataArray) return {}
  const topNode = dataArray.find(data => data.topNode)
  if (!topNode) return {}
  if (!topNode.children) return topNode

  const dataTree = {
    ...topNode,
    children: getNodeChildren(topNode, dataArray),
  }

  return dataTree
}

const Main = ({ searchValue, setSearchValue }) => {
  if (typeof window === "undefined") return <></>
  const [dataArray, setDataArray] = useState([])
  const [data, setData] = useState(undefined)
  const { page, setPage, user, setUser, users, setUsers } = useUser()
  const [checked, setChecked] = useState(true)
  const [value, setValue] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const [selected, setSelected] = useState("")
  const [hide, setHide] = useState(true)

  useEffect(() => {
    get(`${apiUrl}/users`, "Unauthorized").then(dbUsers => {
      if (dbUsers.error) return
      setUsers(dbUsers)
    })
  }, [])

  useEffect(() => {
    if (!dataArray || !dataArray.length) return
    console.log({ dataArray })
    setData(createDataTree(dataArray))
  }, [dataArray])

  useEffect(() => {
    get(`${apiUrl}/wikis`).then(wikis => {
      if (wikis.error) return
      setDataArray(wikis)
    })
  }, [])

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      loggedIn: localStorage.getItem("loggedIn") === "true",
    })
    const exists =
      users &&
      users.find(
        u =>
          u.username === user.username ||
          u.username === localStorage.getItem("username")
      )
  }, [page])

  return (
    <>
      <SEO title="Home" />
      <Page>
        <NavigationDrawer
          boxShadow={DP6}
          color={MAIN_THEME.WHITE.color.foreground}
          backgroundColor={MAIN_THEME.WHITE.color.background}
          onHide={() => setHide(true)}
          hide={hide}
          buttonElementId="hamburger-menu"
        >
          <H2
            color={MAIN_THEME.PRIMARY.color.background}
            onClick={() => {
              setSelected(undefined)
              setSearchValue("")
              setHide(true)
            }}
          >
            {data && data.title}
          </H2>
          {data &&
            data.children &&
            data.children.map(child => (
              <React.Fragment key={child._id}>
                <NavigationLink
                  backgroundColor={MAIN_THEME.PRIMARY.color.background}
                  colorHover={MAIN_THEME.PRIMARY.color.background}
                  color={MAIN_THEME.WHITE.color.foreground}
                  svg={insertPhoto}
                  title={child.title}
                  onClick={() => {
                    setPage("wiki")
                    setHide(true)
                    setSelected(child.title)
                    setSearchValue(undefined)
                  }}
                  selected={selected === child._id}
                />
                {child.children &&
                  child.children.map(subChild => (
                    <SubNavigationLinkWrapper key={subChild._id}>
                      <NavigationLink
                        backgroundColor={MAIN_THEME.PRIMARY.color.background}
                        colorHover={MAIN_THEME.PRIMARY.color.background}
                        color={MAIN_THEME.WHITE.color.foreground}
                        svg={insertPhoto}
                        title={subChild.title}
                        onClick={() => {
                          setPage("wiki")
                          setHide(true)
                          setSelected(subChild.title)
                          setSearchValue(undefined)
                        }}
                        selected={selected === subChild._id}
                      />
                    </SubNavigationLinkWrapper>
                  ))}
              </React.Fragment>
            ))}
        </NavigationDrawer>
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
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    backgroundColor={MAIN_THEME.PRIMARY.color.background}
                  />
                  <Label>Byt tema</Label>
                </Toggle>
                <ActionItem
                  svg={search}
                  onClick={() => {
                    setShowSearch(true)
                    setTimeout(
                      () => document.getElementById("Search").focus(),
                      200
                    )
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
        <Body>
          {page === "home" && <Home />}
          {page === "wiki" &&
            (data ? (
              <Wiki
                dataArray={dataArray}
                setDataArray={setDataArray}
                data={data}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                selected={selected}
                setSelected={setSelected}
                toggleStyle={checked}
              />
            ) : (
              <Spinner />
            ))}
          {page === "signup" && <Signup fields={SIGNUP_FIELDS} />}
          {page === "login" && <Login fields={LOGIN_FIELDS} />}
          {page === "settings" && <Settings />}
        </Body>
      </Page>
      <Footer
        page={page}
        items={FOOTER_MENU.filter(
          item => item.title !== "Wiki" || user.loggedIn
        ).map(item => {
          if (item.title === "Login" && user.username) {
            return {
              ...item,
              title: user.username,
              onClick: () => setPage(item.page),
            }
          }
          return {
            ...item,
            onClick: () => setPage(item.page),
          }
        })}
      />
    </>
  )
}

export default Main
