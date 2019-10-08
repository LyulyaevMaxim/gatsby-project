import i18next from 'i18next'
// import detector from "i18next-browser-languagedetector";
// import Cache from 'i18next-localstorage-cache';
// https://github.com/i18next/i18next-localstorage-backend
// import postProcessor from 'i18next-sprintf-postprocessor';
import { initReactI18next } from 'react-i18next'
import 'isomorphic-fetch'
import backend from 'i18next-fetch-backend'
import resources from '../../../static/locales'

export const languages = Object.keys(resources)
export const defaultLanguage = 'en'

export const i18nConfig = {
  debug: false, //process.env.isDev
  fallbackLng: {
    uk: ['ru'],
    be: ['ru'],
    default: [defaultLanguage],
  },
  ns: Object.keys(resources[defaultLanguage]),
  whitelist: languages,
  resources, //not null, because of troubles with SSR
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json',
  },
  // saveMissing: true, // send not translated keys to endpoint
  react: {
    useSuspense: false,
  },
  ...(process.env.IS_TESTS && { lng: 'en' }),
  interpolation: {
    escapeValue: false, // react already safes from xss
    format: (value, format, lang) => {
      switch (format) {
        //"key": "{{text, uppercase}} uppercased" && t('key', { text: 'you' }); => YOU uppercased
        case 'uppercase': {
          if (!['العربية'].includes(lang)) return value.toUpperCase()
          break
        }

        default:
          break
      }

      //"key": "Date is {{date, MM/DD/YYYY}}" && t('key', { date: new Date() }) => Date is 07/13/2016
      // if(value instanceof Date) return moment(value).format(format);
      return value
    },
  },
}

i18next
  // .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init(i18nConfig)

i18next.on('languageChanged', lng => {
  console.log('Language was changed', lng)
  // moment.locale(lng);
})

/*i18next.addResourceBundle('en', 'namespace1', {
  addedKey: 'It key was added dynamically',
})
 */
/*i18next.loadNamespaces('index', (err, t) => {  })*/

//TODO: -> new Map(), delete const 'languages'
export default {
  en: {
    default: true,
    path: `en`,
    locale: `en-US`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Gatsby project`,
    defaultDescription: `My Gatsby project`,
  },
  ru: {
    path: 'ru',
    locale: `ru-RU`,
    dateFormat: `DD.MM.YYYY`,
    siteLanguage: `ru`,
    ogLanguage: `ru_RU`,
    defaultTitle: `Проект Gatsby`,
    defaultDescription: `Мой проект Gatsby`,
  },
  ar: {
    path: 'ar',
    locale: `ar-AR`,
    dateFormat: `DD.MM.YYYY`,
    siteLanguage: `ar`,
    ogLanguage: `ar_AR`,
    defaultTitle: `مشروع غاتسبي`,
    defaultDescription: `مشروع غاتسبي بلدي`,
  },
}
