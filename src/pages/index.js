import React, { useState } from "react"
import Layout from "../components/layout"

import { UserProvider } from "../contexts/UserContext"
import { WikiProvider } from "../contexts/WikiContext"
import Main from "../components/main"

const IndexPage = () => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <UserProvider>
      <WikiProvider>
        <Layout searchValue={searchValue} setSearchValue={setSearchValue}>
          <Main searchValue={searchValue} setSearchValue={setSearchValue} />
        </Layout>
      </WikiProvider>
    </UserProvider>
  )
}

export default IndexPage
