import React, { useState } from "react"
import Layout from "../components/layout"

import { UserProvider } from "../contexts/UserContext"
import Main from "../components/main"

const IndexPage = () => {
  const [searchValue, setSearchValue] = useState("1234567893")
  return (
    <UserProvider>
      <Layout searchValue={searchValue} setSearchValue={setSearchValue}>
        <Main searchValue={searchValue} />
      </Layout>
    </UserProvider>
  )
}

export default IndexPage
