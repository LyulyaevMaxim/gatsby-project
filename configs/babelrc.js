const path = require('path'),
  root = path.resolve(__dirname, '../'),
  isDev = process.env.NODE_ENV === 'development',
  isTest = process.env.NODE_ENV === 'test',
  isProd = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    ['babel-preset-gatsby', { targets: { browsers: require(`${root}/package.json`).browserslist } }],
    /*[
      '@babel/preset-env',
      !isTest && {
        targets: { browsers: require(`${root}/package.json`).browserslist },
        modules: false,
        loose: true,
        spec: true,
        useBuiltIns: 'usage',
        corejs: 3,
        forceAllTransforms: true,
        debug: false,
      },
    ],*/
    // ['@babel/preset-typescript', { isTSX: false, jsxPragma: 'React', allExtensions: false }],
    // '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    //------------------------------------------STAGE 0------------------------------------------
    /* obj::func => func.bind(obj)                ::obj.func      => obj.func.bind(obj)
       obj::func(val) => func.call(obj, val)      ::obj.func(val) => obj.func.call(obj, val) */
    // 'module:@babel/plugin-proposal-function-bind',

    //------------------------------------------STAGE 1------------------------------------------
    /* obj?.a?.b?.c  => c   || undefined
       obj?.a?.c?.() => c() || undefined */
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],

    /* obj.a ?? 0 is ideal check on null || undefined */
    // ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],

    // ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }], //ESLint has a problem

    /* not supported by TypeScript
      '@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-export-namespace-from',*/

    /* a ||= b  => a || (a = b), and also: a &&= b, a ??= b
      '@babel/plugin-proposal-logical-assignment-operators', */

    //------------------------------------------STAGE 2------------------------------------------
    // ['@babel/plugin-proposal-decorators', { legacy: true }],

    /* function f(a = throw new Error('a - required'), b) { const v = a > 10 || throw new Error("Invalid value") }
       f()  //error, a - required      f(5) // error, invalid value */
    // '@babel/plugin-proposal-throw-expressions',

    /* for generators: '@babel/plugin-proposal-function-sent', */

    //------------------------------------------ OTHER ------------------------------------------
    /*[
      'react-css-modules',
      {
        webpackHotModuleReloading: isDev,
        handleMissingStyleName: 'warn',
        generateScopedName: '[local]-[hash:base64:4]',
        filetypes: { '.pcss': { syntax: 'postcss-scss' } },
        exclude: `${root}/node_modules`,
      },
    ],*/

    /* for react-css-modules and jest */
    // ['module-resolver', { alias: webpackConfig.resolve.alias }],
    /*isDev && ...[`${root}/src/node_modules/react-hot-loader/babel`, '@babel/plugin-transform-react-jsx-source'],*/
    /*isProd && [
      ['react-remove-properties', { properties: ['data-test'] }],
      'closure-elimination',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      'lodash', //for Jest
      'minify-dead-code-elimination',
    ],*/
  ].filter(Boolean),
}
