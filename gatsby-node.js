import LoadablePlugin from '@loadable/webpack-plugin'

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
  })
}
