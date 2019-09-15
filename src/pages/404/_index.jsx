import React from 'react'
import { css } from '@emotion/core'
// import Layout from 'components/layout'
// import SEO from 'components/seo'

/*const translates = {
  en: {
    title: ({ title }) => `Not found on ${title}`,
    text: `You just hit a route that doesn't exist`,
  },
  rus: {
    title: ({ title }) => `Страница ${title} не найдена`,
    text: 'К сожалению, адреса, на который вы перешли, не существует',
  },
}*/

const styles = {
  button: css`
    padding: 1.5rem 1rem;
  `,
}

export const NotFoundPage = ({ data, pathContext: { langKey }, ...props }) => (
  <>
    <button type='button' css={styles.button}>Text</button>
    {/* <SEO title="404: Not found" /> */}
    {/*<h1>{translates[langKey].title({ title: data.site.siteMetadata.title })}</h1>*/}
    {/*<p>{translates[langKey].text}</p>*/}
  </>
)
