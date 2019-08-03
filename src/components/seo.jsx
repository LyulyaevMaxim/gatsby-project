import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'

export function SEO({ locale, pageName }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const { siteMetadata } = data.site,
    { t } = useTranslation(pageName),
    title = t(['pageTitle', 'common:pageTitle'])

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={title}
      titleTemplate={title !== siteMetadata.title ? `%s | ${siteMetadata.title}` : title}
      defer={false}
      meta={
        [
          {
            name: `description`,
            content: siteMetadata.description,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: siteMetadata.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: siteMetadata.description,
          },
        ] /*
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)*/
      }
      children={
        //TODO: install locally
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
      }
    />
  )
}

/*SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}*/

/* SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
} */

// export default SEO
