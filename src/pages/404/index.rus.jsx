// import React from 'react'
import { graphql } from 'gatsby'
import { NotFoundPage } from './_index';

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default NotFoundPage
