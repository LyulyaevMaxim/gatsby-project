import React from 'react'
import i18next from 'i18next'
import 'modules/i18'
import { ThemeProvider } from '@material-ui/styles'
// import { StyleSheetManager } from 'styled-components'
// import { createGlobalStyle } from 'styled-components'
import { CssBaseline } from '@material-ui/core';
import { theme } from 'styles/theme'
import { SEO } from 'components/seo'
import { Notifications } from 'components/notifications'

/*const styledComponentsPlugins = [
  stylisRTLPlugin
]*/

/*const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`*/

export const wrapPageElement = ({ element, props }) => {
  const { pageContext } = props
  i18next.changeLanguage(pageContext.locale)
  console.log('theme: ', theme)
  return (
    <>
      <CssBaseline />
      <SEO locale={pageContext.locale} pageName={pageContext.pageName} />
      {/*<StyleSheetManager stylisPlugins={styledComponentsPlugins}>*/}
      <ThemeProvider theme={theme}>
        {/*<GlobalStyle />*/}
        {element}
        <Notifications />
      </ThemeProvider>
      {/*</StyleSheetManager>*/}
    </>
  )
}
