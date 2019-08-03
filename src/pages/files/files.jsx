import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from 'components/layout'

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>Files of my site</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th> 
              {' '}
              <th>prettySize</th> 
              {' '}
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }) => (
              <tr key={node.relativePath}>
                <td>{node.relativePath}</td> 
                {' '}
                <td>{node.prettySize}</td>
                <td>{node.extension}</td> 
                {' '}
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
