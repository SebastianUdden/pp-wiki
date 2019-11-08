import React from "react"
import Layout from "../components/layout"

import { UserProvider } from "../contexts/UserContext"
import Main from "../components/main"

const IndexPage = () => (
  <UserProvider>
    <Layout>
      <Main />
    </Layout>
  </UserProvider>
)

export default IndexPage
