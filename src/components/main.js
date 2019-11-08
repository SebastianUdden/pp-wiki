import React, { useEffect } from "react"
import styled from "styled-components"
import { useUser } from "../contexts/UserContext"
import SEO from "./seo"
import Footer from "./footer/footer"

// import Home from "./home/Home"
// import Signup from "./user/Signup"
// import Login from "./user/Login"
// import Settings from "./user/Settings"
// import { LOGIN_FIELDS, SIGNUP_FIELDS } from "../constants/fields"

import { FOOTER_MENU } from "../constants/menus"
import Wiki from "./wiki/Wiki"
import { MOCK_WIKI } from "./wiki/wiki-mocks"

const Body = styled.div`
  margin-bottom: 10vh;
`

const Main = () => {
  const { page, setPage, setUser } = useUser()

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      loggedIn: localStorage.getItem("loggedIn") === "true",
    })
  }, [page])

  return (
    <>
      <SEO title="Home" />
      <Body>
        {page === "wiki" && <Wiki data={MOCK_WIKI} />}
        {/* {page === "home" && <Home />}
        {page === "signup" && <Signup fields={SIGNUP_FIELDS} />}
        {page === "login" && <Login fields={LOGIN_FIELDS} />}
        {page === "settings" && <Settings />} */}
      </Body>
      <Footer
        items={FOOTER_MENU.map(item => ({
          ...item,
          onClick: () => setPage(item.page),
        }))}
      />
    </>
  )
}

export default Main
