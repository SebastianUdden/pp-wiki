/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { SMALL } from "../constants/sizes"
import { BASE_TEXT_COLOR, BACKGROUND } from "../constants/theme"
import { UserProvider } from "../contexts/UserContext"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${SMALL}px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  color: ${BASE_TEXT_COLOR};
  background: ${BACKGROUND};
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <UserProvider>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
    </UserProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
