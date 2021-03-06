import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "../contexts/UserContext"
import { useWiki } from "../contexts/WikiContext"
import { apiUrl } from "../constants/urls"
import SEO from "./seo"
import Footer from "./footer/footer"
import { FOOTER_MENU } from "../constants/menus"

import Home from "./home/Home"
import Tools from "./tools/Tools"
import Signup from "./user/Signup"
import Login from "./user/Login"
import Settings from "./user/Settings"
import { LOGIN_FIELDS, SIGNUP_FIELDS } from "../constants/fields"

import Wiki from "./wiki/Wiki"
import { MEDIA_MIN_MEDIUM } from "../constants/sizes"
import { get } from "./api/api"
import Spinner from "./wiki/Spinner"
import SideMenu from "./sideMenu/SideMenu"
import TopMenu from "./topMenu/TopMenu"
import Profile from "./user/Profile"

const Page = styled.div`
  padding: 0;
  margin: 0;
  margin-bottom: 10vh;
`
const Body = styled.div`
  padding: 0 0.5rem 1rem;
  margin: 1rem auto;
  margin-bottom: 10vh;
  ${MEDIA_MIN_MEDIUM} {
    padding: 0 2rem 1rem;
  }
`

const Span = styled.span`
  color: orange;
`

export const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

const getNodeChildren = (node, wikiEntries = []) => {
  return node && node.children
    ? node.children.map(child => {
        const treeNode = wikiEntries.find(
          data => data._id === child || data._id === child._id
        )
        if (!treeNode) return
        return {
          ...treeNode,
          children: getNodeChildren(treeNode, wikiEntries),
        }
      })
    : []
}

const createDataTree = wikiEntries => {
  if (!wikiEntries) return {}
  const topNode = wikiEntries.find(data => data.topNode)
  if (!topNode) return {}
  if (!topNode.children) return topNode

  const dataTree = {
    ...topNode,
  }

  return dataTree
}

const Main = () => {
  if (typeof window === "undefined") return <></>
  const { wikiEntries, setWikiEntries } = useWiki()
  const { page, setPage, user, setUser, users, setUsers } = useUser()
  const [reload, setReload] = useState(false)
  const [data, setData] = useState(undefined)
  const [foundMatch, setFoundMatch] = useState(false)
  const [theme, setTheme] = useState("Grey")
  const [levelDepth, setLevelDepth] = useState(0)
  const [hide, setHide] = useState(true)

  const [selected, setSelected] = useState("Wiki")
  const [searchValue, setSearchValue] = useState("")
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(0)

  window.onhashchange = () => {
    const hash = document.location.hash
    if (!hash) return
    const formattedHash = hash
      .substring(10)
      .split("%20")
      .join(" ")
    setSelected(formattedHash)
  }

  useEffect(() => {
    get(`${apiUrl}/users`, "Unauthorized").then(dbUsers => {
      if (dbUsers.error) return
      setUsers(dbUsers)
    })
    setPage("tools")
  }, [])

  useEffect(() => {
    if (history[historyIndex] && !history[historyIndex].isSelected) {
      setFoundMatch(false)
    }
  }, [historyIndex])

  useEffect(() => {
    setFoundMatch(false)
  }, [searchValue])

  useEffect(() => {
    if (!wikiEntries || !wikiEntries.length) return
    if (page !== "wiki") return
    const dataTree = createDataTree(wikiEntries)
    setData(dataTree)
  }, [wikiEntries, page])

  useEffect(() => {
    get(`${apiUrl}/wikis`).then(entries => {
      if (entries.error) return
      setWikiEntries(entries)
    })
  }, [reload])

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      loggedIn: localStorage.getItem("loggedIn") === "true",
    })
  }, [page])

  useEffect(() => {
    const newHistory = history.slice(0, historyIndex + 1)
    if (selected) {
      setHistory([...newHistory, { isSelected: true, value: selected }])
    }
    if (searchValue) {
      setHistory([...newHistory, { isSelected: false, value: searchValue }])
    }
    setHistoryIndex(newHistory.length)
    document.location.hash = ""
  }, [selected, searchValue])

  return (
    <>
      <SEO title="Home" />
      <Page>
        <SideMenu
          hide={hide}
          onHide={() => setHide(true)}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
          setSearchValue={setSearchValue}
          history={history}
          setHistory={setHistory}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          levelDepth={levelDepth}
          setLevelDepth={setLevelDepth}
          reload={reload}
          setReload={setReload}
          data={data}
        />
        <TopMenu
          setHide={setHide}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelected={setSelected}
          history={history}
          setHistory={setHistory}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          theme={theme}
          setTheme={setTheme}
        />
        <Body>
          {page === "home" && <Home />}
          {page === "tools" && <Tools />}
          {page === "wiki" &&
            (data ? (
              <Wiki
                onFoundMatch={() => setTimeout(() => setFoundMatch(true), 1)}
                data={data}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                selected={selected}
                setSelected={setSelected}
                history={history}
                setHistory={setHistory}
                historyIndex={historyIndex}
                setHistoryIndex={setHistoryIndex}
                theme={theme}
              />
            ) : (
              <Spinner />
            ))}
          {page === "wiki" && !foundMatch && data && (
            <h2>
              No matches found for{" "}
              <Span>
                {history[historyIndex] &&
                  !history[historyIndex].isSelected &&
                  history[historyIndex].value}
              </Span>
              ...
            </h2>
          )}
          {page === "signup" && <Signup fields={SIGNUP_FIELDS} />}
          {page === "login" && <Login fields={LOGIN_FIELDS} />}
          {page === "profile" && user.loggedIn && <Profile />}
        </Body>
      </Page>
      <Footer
        page={page}
        items={FOOTER_MENU.filter(item => {
          if (
            (item.title === "Signup" && user.loggedIn) ||
            (item.title === "Login" && user.loggedIn)
          ) {
            return false
          }
          if (
            item.title === "Home" ||
            item.title === "Signup" ||
            item.title === "Login"
          ) {
            return true
          }
          if (user.loggedIn) {
            return true
          }
        }).map(item => ({
          ...item,
          onClick: () => setPage(item.page),
        }))}
      />
    </>
  )
}

export default Main
