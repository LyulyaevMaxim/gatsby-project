import path from 'path'
import { get } from 'lodash'
import locales from './src/modules/i18'
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

  // if some module (for example, "bad module") throw error because of "window is undefined" when we can to replace this module with a dummy module during server rendering
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
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
  const { createPage, deletePage } = actions
  deletePage(page)
  Object.keys(locales).map(lang => {
    const currentLocale = locales[lang]
    return createPage({
      ...page,
      path: removeTrailingSlash(`${currentLocale.default ? '' : currentLocale.path}${page.path}`),
      context: {
        ...page.context,
        locale: lang,
        dateFormat: currentLocale.dateFormat,
        pageName: get(/(?<filename>[a-z]+)-\w+$/.exec(page.jsonName), 'groups.filename', 'index'),
      },
    })
  })
}

exports.createPages = async ({ page, actions: { createPage, deletePage }, graphql }) => {
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
