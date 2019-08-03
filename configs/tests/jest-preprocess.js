const path = require('path'),
  root = path.resolve(__dirname, '../../')

module.exports = require('babel-jest').createTransformer(require('../babelrc'))
