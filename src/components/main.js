import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "../contexts/UserContext"
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

const Main = () => {
  if (typeof window === "undefined") return <></>
  const [dataArray, setDataArray] = useState([])
  const [data, setData] = useState(undefined)
  const { page, setPage, user, setUser, users, setUsers } = useUser()
  const [toggleStyle, setToggleStyle] = useState(true)

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
    if (!dataArray || !dataArray.length) return
    if (page !== "wiki") return
    console.log({ dataArray })
    setData(createDataTree(dataArray))
  }, [dataArray, page])

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
        <SideMenu
          hide={hide}
          onHide={() => setHide(true)}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
          setSearchValue={setSearchValue}
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
                dataArray={dataArray}
                setDataArray={setDataArray}
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
