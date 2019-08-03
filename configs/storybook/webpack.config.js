module.exports = ({ config }) => {
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // config.module.rules[0].use[0].loader = require.resolve('babel-loader')

  /*config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ]*/

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  })

  config.module.rules[0].use[0].options.plugins = [require.resolve('@babel/plugin-proposal-class-properties')]

  config.resolve.mainFields = ['browser', 'module', 'main']

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
