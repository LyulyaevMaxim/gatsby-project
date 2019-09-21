/* https://www.gatsbyjs.org/docs/gatsby-config/ */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const connectSystemFiles = [
  { name: 'images', path: `${__dirname}/src/images` },
  { name: 'data', path: `${__dirname}/src/` },
  { name: 'translations', path: `${__dirname}/static/locales` },
].map(options => ({ resolve: 'gatsby-source-filesystem', options }))

module.exports = {
  pathPrefix: `/react-project`, //repository name
  proxy: {
    prefix: '/api',
    url: process.env.API_URL,
  },
  siteMetadata: {
    title: 'React Project',
    description: 'Description',
    author: 'Lyulyaev Maxim',
    apiUrl: process.env.API_URL,
    siteUrl: `https://www.example.com`,
  },
  plugins: [
    /*{
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        stages: ['develop', 'build-javascript'],
        exclude: /(node_modules|.cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },*/
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-transition-link',
    ...connectSystemFiles,
    'gatsby-transformer-json',
    /* images: optimizations and GraphQL */
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    /*{
      resolve: 'gatsby-source-mongodb',
      options: {
        dbName: `cloud`,
        collection: `documents`,
        server: { address: `ds143532.mlab.com`, port: 43532 },
        auth: { user: `admin`, password: `12345` },
        map: { documents: { description: `text/markdown` } },
      },
    },*/
    /*{
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        fetchOptions: {},
      },
    },*/
    // @gatsby-contrib/gatsby-plugin-elasticlunr-search
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-plugin-emotion',
    //although intended for SC, but help Emotion with a compact displaying in DevTools
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: require('./configs/postcss.config').plugins,
        // cssLoaderOptions: { camelCase: false }
      },
    },
    'gatsby-plugin-sitemap',
    /*'gatsby-plugin-feed', //for RSS */
    /*---------------- for PWA ----------------*/
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
    'gatsby-plugin-offline',
    /*{
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },*/
    /*{
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/!**", "/do-not-track/me/too/"],
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "example.com",
      },
    },
    //preloading with using Machine Learning and Google Analytics
    {
      resolve: "gatsby-plugin-guess-js",
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: `VIEW_ID`,
        minimumThreshold: 0.03,
        // The "period" for fetching analytic data.
        period: {
          startDate: new Date("2018-1-1"),
          endDate: new Date(),
        },
      },
    },
    */
  ],
}
