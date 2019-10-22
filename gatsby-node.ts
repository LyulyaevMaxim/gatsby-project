import path from 'path'
import { GatsbyNode } from 'gatsby'
import LoadablePlugin from '@loadable/webpack-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
