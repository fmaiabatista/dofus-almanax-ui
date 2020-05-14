/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `calc(2.45rem + 1.45rem + 1.45rem) auto 0`,
          // 100vh - h1 - header padding top - header padding bottom
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flex: 1, marginTop: "1rem" }}>{children}</main>
        <footer>
          {new Date().getFullYear()} &middot; Code by{" "}
          <a href="https://github.com/fmaiabatista">@fmaiabatista</a> &middot;
          Proudly using <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
