import React from 'react'
import i18next from 'i18next'
import 'modules/i18'
import { ThemeProvider } from '@material-ui/styles'
// import { StyleSheetManager } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { CssBaseline as MaterialCSSReset } from '@material-ui/core'
import { theme } from 'styles/theme'
import { SEO } from 'components/seo'
import { Notifications } from 'components/notifications'
import { Header } from 'components/header'
// import './index.css'

/*const styledComponentsPlugins = [
  stylisRTLPlugin
]*/

const CustomCSSReset = createGlobalStyle`
  a {
    color: inherit;
    text-decoration: none;
  }
`

export const wrapPageElement = ({ element, props }) => {
  const { pageContext } = props
  i18next.changeLanguage(pageContext.locale)
  return (
    <>
      <MaterialCSSReset />
      <CustomCSSReset />
      <SEO locale={pageContext.locale} pageName={pageContext.pageName} />
      {/*<StyleSheetManager stylisPlugins={styledComponentsPlugins}>*/}
      <ThemeProvider theme={theme}>
        {element}
        <Notifications />
      </ThemeProvider>
      {/*</StyleSheetManager>*/}
    </>
  )
}

interface ILayout {
  children: React.ReactNode
}

export const Layout : React.FC<ILayout> = props => (
  <>
    <Header />
    <main>{props.children}</main>
    <footer>
      {`© ${new Date().getFullYear()}, Built with  `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </>
)


