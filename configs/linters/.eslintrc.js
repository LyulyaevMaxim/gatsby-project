const path = require('path'),
  root = path.resolve(__dirname, '../..')

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
  globals: {
    graphql: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    project: `${root}/tsconfig.json`,
    tsconfigRootDir: root,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'import',
    '@typescript-eslint',
    '@typescript-eslint/tslint',
    'react',
    'react-hooks',
    // 'promise',
    /*'security',*/
    // 'json',
    // 'optimize-regex',
    // 'compat',
    // 'deprecate',
    // 'sonarjs',
    // 'unicorn',
    'i18next',
    'jest',
    'cypress',
    'prettier',
  ],
  extends: [
    // 'react-app',
    // 'eslint:recommended',
    'airbnb',
    // 'esnext',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:import/typescript',
    // 'plugin:promise/recommended',
    // 'plugin:security/recommended',
    // 'plugin:you-dont-need-lodash-underscore/compatible',
    // 'plugin:react/all',
    // 'plugin:compat/recommended',
    // 'plugin:sonarjs/recommended',
    // 'plugin:unicorn/recommended',
    // 'standard',
    // 'standard-react',
    'plugin:jest/recommended',
    // 'jest-enzyme',
    // 'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'plugin:cypress/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
  ],
  rules: {
    'one-var': 0,
    'spaced-comment': 0,
    'no-param-reassign': 1,
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'no-shadow': 1,

    'react/prop-types': 0,
    'react/jsx-no-literals': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-closing-tag-location': 0,
    'react/destructuring-assignment': 0,
    'react/no-children-prop': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 2,
    'react/jsx-max-depth': [1, { max: 5 }],
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,

    'import/no-extraneous-dependencies': 0, //because of Yarn Workspaces
    'import/prefer-default-export': 0,

    // '@typescript-eslint/no-use-before-define': 0,
    // '@typescript-eslint/interface-name-prefix': 0,

    /* I can use it because disabling rules don't work
    '@typescript-eslint/tslint/config': [
      2,
      {
        lintFile: `${path.resolve(__dirname)}/tslint.json`,
      },
    ],*/
    // 'deprecate/function': ['error', { name: 'legacyFunc', use: 'newFunc from this package' }],
    // 'deprecate/member-expression': ['error', { name: 'React.createClass', use: 'native es6 classes' }],
    // 'deprecate/import': ['warn', { name: `${root}/src/node_modules/moment`, use: 'newModule' }],
    // 'optimize-regex/optimize-regex': 'warn',
    // 'compat/compat': 1,
    // 'import/no-unresolved': 0,
    // 'import/no-namespace': 0,

    // 'import/no-extraneous-dependencies': 0,
    // 'import/no-dynamic-require': 0,
    // 'import/newline-after-import': 0,
    // 'global-require': 0,
    // 'standard/computed-property-even-spacing': 1,
    // 'jsx-a11y/label-has-for': 1,
    // 'jsx-a11y/label-has-associated-control': 1,
    // 'react/display-name': 0,
    // 'react/destructuring-assignment': 0,
    // 'react/sort-comp': 0,
    // 'react/jsx-key': 0,
    // 'react/no-did-update-set-state': 0,
    // 'react/button-has-type': 0,
    // 'prefer-rest-params': 0,
    // 'consistent-return': 0,
    // 'no-underscore-dangle': 1,
    // 'no-shadow': 1,
    // 'no-plusplus': 1,
    // curly: 0,
    // 'space-before-function-paren': 0,
    // 'comma-dangle': 0,
    // 'no-trailing-spaces': 0,
    // 'no-multiple-empty-lines': 0,
    // 'no-useless-escape': 0,
    // 'no-tabs': 0,

    // 'spaced-comment': 0,

    // 'no-return-await': 0,
    // 'no-multi-spaces': 0,
    // 'no-extra-boolean-cast': 0,
    // 'standard/object-curly-even-spacing': 0,

    // 'jsx-a11y/no-noninteractive-element-interactions': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
  },
  settings: {
    'import/core-modules': ['gatsby'],
    'import/resolver': {
      /*webpack: {
        // config: `${root}/webpack.config.js`,
        config: {
          resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
            modules: [`${root}/src`, `${root}/node_modules`],
          },
        },
      },*/
      node: {
        paths: [`${root}/src`],
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
