const path = require('path'),
  root = path.resolve(__dirname, '../../')

module.exports = ({ config }) => {
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }], '@emotion/babel-preset-css-prop'],
    },
  })

  config.module.rules[0].use[0].options.plugins = [require.resolve('@babel/plugin-proposal-class-properties')]

  config.resolve.mainFields = ['browser', 'module', 'main']

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.modules.push(`${root}/src`, 'node_modules')

  return config
}
