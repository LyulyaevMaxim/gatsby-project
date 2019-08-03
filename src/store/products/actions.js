import productsData from './data'

export async function createProductPages({ createPage, graphql }) {
  productsData.forEach(product => {
    createPage({
      path: `/product/${product.slug}/`,
      component: require.resolve('../../templates/products/product.jsx'),
      context: {
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
      },
    })
  })

  const productsByGraphql = await graphql(`
    {
      allProductsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  productsByGraphql.data.allProductsJson.edges.forEach(edge => {
    const product = edge.node
    createPage({
      path: `/gql/${product.slug}/`,
      component: require.resolve('../../templates/products/product-graphql.jsx'),
      context: {
        slug: product.slug,
      },
    })
  })
}
