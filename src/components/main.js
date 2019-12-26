import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "../contexts/UserContext"
import { useWiki } from "../contexts/WikiContext"
import { apiUrl } from "../constants/urls"
import SEO from "./seo"
import Footer from "./footer/footer"
import { FOOTER_MENU } from "../constants/menus"

import Home from "./home/Home"
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
// import { FLAT_DATA } from "./wiki/wiki-mocks"

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

const Span = styled.span`
  color: orange;
`

export const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`
export const Label = styled.label`
  margin-left: 0.5rem;
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
    // children: getNodeChildren(topNode, wikiEntries),
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
  const [toggleStyle, setToggleStyle] = useState(true)
  const [levelDepth, setLevelDepth] = useState(0)

  const [selected, setSelected] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [hide, setHide] = useState(true)

  useEffect(() => {
    get(`${apiUrl}/users`, "Unauthorized").then(dbUsers => {
      if (dbUsers.error) return
      setUsers(dbUsers)
    })
  }, [])

  useEffect(() => {
    setFoundMatch(false)
  }, [searchValue])

  useEffect(() => {
    if (!wikiEntries || !wikiEntries.length) return
    if (page !== "wiki") return
    console.log({ wikiEntries })
    const dataTree = createDataTree(wikiEntries)
    console.log({ dataTree })
    setData(dataTree)
  }, [wikiEntries, page])

  useEffect(() => {
    console.log("Reloading...")
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
        <SideMenu
          hide={hide}
          onHide={() => setHide(true)}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
          setSearchValue={setSearchValue}
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
          toggleStyle={toggleStyle}
          onToggleStyle={() => setToggleStyle(!toggleStyle)}
        />
        <Body>
          {page === "home" && <Home />}
          {page === "wiki" &&
            (data ? (
              <Wiki
                onFoundMatch={() => setTimeout(() => setFoundMatch(true), 10)}
                data={data}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                selected={selected}
                setSelected={setSelected}
                toggleStyle={toggleStyle}
              />
            ) : (
              <Spinner />
            ))}
          {page === "wiki" && !foundMatch && data && (
            <h2>
              No matches found for <Span>{searchValue}</Span>...
            </h2>
          )}
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
