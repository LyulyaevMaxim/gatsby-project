import React from 'react'
import i18next from 'i18next'
import { navigate } from 'gatsby'
import { get } from 'lodash'
import { languages, defaultLanguage } from 'modules/i18'

export default function NotFoundPage(props) {
  if (get(props, 'pageResources.page.path') === '/404.html') {
    const localePrefix = languages.find(language => props.location.pathname.startsWith(`/${language}/`))
    navigate(`/${localePrefix || defaultLanguage}/404`)
  }

  return `404 ${i18next.language}`
}
