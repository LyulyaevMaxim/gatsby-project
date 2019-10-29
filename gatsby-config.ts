// https://www.gatsbyjs.org/docs/gatsby-config/
import * as env from 'dotenv'
import { siteMetadata } from './static/constants'

env.config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  pathPrefix: `/react-project`,
  proxy: {
    prefix: '/api',
    url: process.env.API_URL,
  },
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    'gatsby-plugin-typescript-checker',
    '@rhysforyou/gatsby-plugin-react-helmet-async',
    'gatsby-plugin-transition-link',

    'gatsby-transformer-json',
    // images: optimizations and GraphQL
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    //although intended for SC, but help Emotion with a compact displaying in DevTools
    // 'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: require('./configs/postcss.config').plugins,
        // cssLoaderOptions: { camelCase: false }
      },
    },
    'gatsby-plugin-sitemap',
    //---------------- for PWA ----------------
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ReactProject',
        short_name: 'ReactProject',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        icon: 'src/images/gatsby-icon.png',
        display: 'minimal-ui',
      },
    },
    process.env.isProduction && 'gatsby-plugin-offline',

    //stubs
    'gatsby-plugin-nullish-coalescing-operator'
  ],
}
