/* https://www.gatsbyjs.org/docs/node-apis/ */

import path from 'path'
import { get } from 'lodash'
import locales, { defaultLanguage, languages } from './src/modules/i18'
// import { createPokemonPages } from './src/store/pokemons/actions'
// import { createProductPages } from './src/store/products/actions'

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty', //for require.context polyfill
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })

  /* if some module (for example, "bad module") throw error because of "window is undefined"
     when we can to replace this module with a dummy module during server rendering
  if (stage === 'build-html')
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })*/
}

exports.onCreateDevServer = ({ app }) => {
  // app.use('/static/locales', express.static(`${__dirname}/static/locales`))
}

/*
  const fetch = require("node-fetch"),
    getJSON = uri => fetch(uri).then(response => response.json())
    => getJSON("https://some-rest-api.com/pokemon")
*/

const removeTrailingSlash = p => (p === `/` ? p : p.replace(/\/$/, ``))

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage, createRedirect } = actions

  if (['/', '/dev-404-page/'].every(url => page.path !== url)) deletePage(page)

  if (page.path === '/404.html')
    createPage({
      ...page,
      context: {
        ...page.context,
        locale: defaultLanguage,
        dateFormat: locales[defaultLanguage].dateFormat,
      },
    })

  languages.forEach(lang => {
    const currentLocale = locales[lang],
      pagePath = removeTrailingSlash(`${currentLocale.path}${page.path}`)
    // for URL without language will redirect to version with default language (/defaultLocale/!*)
    // need to create redirects for '/url/' and '/url'
    if (currentLocale.default) {
      const isURLWithLanguage = languages.some(language => new RegExp(`^/${language}/`).test(page.path))
      if (!isURLWithLanguage)
        [page.path, removeTrailingSlash(page.path)].forEach(fromPath =>
          createRedirect({
            fromPath,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: `/${pagePath}`,
          })
        )
    }
    createPage({
      ...page,
      path: pagePath,
      context: {
        ...page.context,
        locale: lang,
        dateFormat: currentLocale.dateFormat,
        pageName: get(/(?<filename>[a-z]+)-\w+$/.exec(page.jsonName), 'groups.filename', 'index'),
      },
    })
  })
}

exports.createPages = async ({ actions }) => {
  // const { createPage, deletePage, createRedirect } = actions
  /*[{name: 'Dog 1' }].forEach(dog => {
      createPage({
        path: `/${dog.name}`,
        component: require.resolve(`./src/templates/dog-template.js`),
        context: { dog },
      })
    })*/
  // await Promise.all([createPokemonPages({ createPage }), createProductPages({ createPage, graphql })])
  // Mongodb{dbName}{collection} is a data node type created from mongoDB
  /*const { data } = await graphql(`
      {
        allMongodbCloudDocuments(limit: 1000) {
          edges {
            node {
              id
            }
          }
        }
      }
    `)

  for (const { node } of data.allMongodbCloudDocuments.edges)
    createPage({
      path: `/item/${node.id}/`,
      component: path.resolve(`./src/templates/mongo-item/index.jsx`),
      context: {
        id: node.id,
      },
    })*/
}

/*exports.onCreateNode = ({ node }) => {
  console.log('createNode', node.internal.type)
}*/

/*exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const pokemons = [
    { name: "Pikachu", type: "electric" },
    { name: "Squirtle", type: "water" },
  ]

  pokemons.forEach(pokemon => {
    const node = {
      name: pokemon.name,
      type: pokemon.type,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}*/
